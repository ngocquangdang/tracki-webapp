import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { CookiesPageContext } from '@Interfaces';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Support conditional redirecting, both server-side and client-side.
 *
 * Client-side, we can use next/router. But that doesn't exist on the server.
 * So on the server we must do an HTTP redirect. This component handles
 * the logic to detect whether on the server and client and redirect
 * appropriately.
 *
 * @param WrappedComponent The component that this functionality
 * will be added to.
 * @param clientCondition A function that returns a boolean representing
 * whether to perform the redirect. It will always be called, even on
 * the server. This is necessary so that it can have hooks in it (since
 * can't be inside conditionals and must always be called).
 * @param serverCondition A function that returns a boolean representing
 * whether to perform the redirect. It is only called on the server. It
 * accepts a Next page context as a parameter so that the request can
 * be examined and the response can be changed.
 * @param location The location to redirect to.
 */
export default function withConditionalRedirect<CP = {}, IP = CP>({
  WrappedComponent,
  clientCondition,
  serverCondition,
  location,
}: {
  WrappedComponent;
  clientCondition(): boolean;
  serverCondition(ctx: CookiesPageContext): boolean;
  location: string;
}): NextPage<CP, IP> {
  console.log('cccccccc');

  const WithConditionalRedirectWrapper = props => {
    const router = useRouter();
    const redirectCondition = clientCondition();
    if (isBrowser() && redirectCondition) {
      console.log('asdasdasdadasdasdas');

      router.push(location);
      // eslint-disable-next-line react/react-in-jsx-scope
      return <></>;
    }
    // eslint-disable-next-line react/react-in-jsx-scope
    return <WrappedComponent {...props} />;
  };

  WithConditionalRedirectWrapper.xxx = async (ctx): Promise<IP> => {
    console.log('cccccccasdasdasdasc');
    if (!isBrowser() && ctx.res) {
      if (serverCondition(ctx as CookiesPageContext)) {
        console.log('cccccccssssc');
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
      }
    }

    const componentProps =
      WrappedComponent.xxx && (await WrappedComponent.xxx(ctx));

    return { ...(componentProps as IP) };
  };

  return WithConditionalRedirectWrapper;
}
