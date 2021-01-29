export const firebaseEnvent = {
  login_page: {
    enter_email: {
      description: 'Fill Email address and Password to Login',
    },
    enter_password: {
      description: 'Fill Email address and Password to Login',
    },
    remember_me: {
      description: 'Accept save Email address and Password on web',
    },
    login: {
      descriptin: 'Login and go to Trackers page',
    },
    forgot_password: {
      description: 'Forgot Password and go to “Reset Password” page',
    },
    create_account: {
      description: 'Create Account',
    },
  },
  help_contact_support: {
    call_support: {},
    chat_with_support: {
      description: 'Chat with support. Go to “Chat Support” screen',
    },
  },
  forgot_password_page: {
    enter_email: {
      description: 'Fill Email address to reset password',
    },
    reset_password: {
      description:
        'Enter the email address associated with your account and we will send you instructions how to reset your password',
    },
    back_login_page: {
      description: 'Back to Login page',
    },
    enter_code_forgot_password: {
      description: 'Fill code to confirm reset password request',
    },
    forgot_password_submit: {
      description: 'Submit change new password',
    },
  },
  create_account_page: {
    back_login_page: {
      description: 'Back to Login page',
    },
    create_account_submit: {
      description: 'Submit create new account',
    },
  },
  about_tracki_page: {
    terms_of_service: {
      description:
        'Terms of Service. Go to https://tracki.com/pages/terms-of-service within “Terms of Service” screen',
    },
    privacy_policy: {
      description:
        'Privacy Policy. Go to https://tracki.com/pages/privacy-policy within “Privacy Policy” Screen',
    },
  },

  // start trackers page
  trackers_page: {
    device_detail: {
      description: 'Go to detail of Device',
    },
    search_device: {
      description: 'Search Device in Device List',
    },
    add_tracker: {
      description: 'Go to Add Device page',
    },
  },
  device_detail: {
    back_device_list: {
      description: 'Back to device list drawer',
    },
    settings_device: {
      description: 'Go to Device setting drawer',
    },
    history_device: {
      description: 'Go to Device History Report drawer',
    },
    geofences_device: {
      description: 'Go to Geofence of Device drawer',
    },
    send_beep_device: {
      description: 'Beep. It will generate a beep to the selected device.',
    },
    shareLocation_device: {
      description: 'Share current location of Device via Map URL',
    },
    notifications: {
      description: 'Go to Notification of Device drawer ',
    },
    get_current_location: {
      description: 'Get current location of Device',
    },
  },
  settings_device: {
    settings_device_update_setting: {
      description: 'Update setting for device',
    },
    settings_device_cancel_setting: {
      description: 'Cancel setting has changed for device',
    },
    settings_device_tracking_mode: {
      description: 'Go to Tracking Mode Modal',
    },
    settings_device_subscriptions: {
      description: 'Go to Subscription Modal',
    },
    settings_device_select_kph: {
      description:
        'Kph. Click the radio button so kph becomes the default speed unit',
    },
    settings_device_select_mph: {
      description:
        'Mph. Click the radio button so mph becomes the default speed unit',
    },
    activate_speed_alert: {
      description:
        'Speed Alert Toggle, when was previously turned off. Opens “Speed Alert Options” ',
    },
    deactivate_speed_alert: {
      description:
        'Speed Alert Toggle, when was previously turned on. Closes “Speed Alert Options”',
    },
    activate_start_moving_alert: {
      description:
        'Start Moving Alert Toggle, when was previously turned off. Add contact icons appears',
    },
    deactivate_start_moving_alert: {
      description:
        'Start Moving Toggle, when was previously turned on. Hides contact icons.',
    },
    add_contact_speed_limit: {
      description: 'Go to Contact list Sidebar',
    },
    add_contact_moving_alert: {
      description: 'Go to Contact list Sidebar',
    },
    add_contact_low_battery_alert: {
      description: 'Go to Contact list Sidebar',
    },
    activate_low_battery: {
      description:
        'Low Battery Alert Toggle, when was previously turned off. Add contact icons appears',
    },
    deactivate_low_battery: {
      description:
        'Low Battery Alert Toggle, when was previously turned on. Hides contact icons.',
    },
    activate_device_beeper: {
      description:
        'Enable Beeper + Low Battery Beep on Device Toggle, when was previously turned OFF.',
    },
    deactivate_device_beeper: {
      description:
        'Enable Beeper + Low Battery Beep on Device Toggle, when was previously turned ON.',
    },
    activate_geofence_entry_alert: {
      description:
        'Geo-fence entry Alert Toggle, when was previously turned OFF.',
    },
    deactivate_geofence_entry_alert: {
      description:
        'Geo-fence entry Alert Toggle, when was previously turned ON.',
    },
    activate_geofence_exit_alert: {
      description:
        'Geo-fence Exit Alert Toggle, when was previously turned OFF.',
    },
    deactivate_geofence_exit_alert: {
      description:
        'Geo-fence Exit Alert Toggle, when was previously turned ON.',
    },
    settings_device_setup_geofence: {
      description: 'Setup Geofence. Go to “Linked Geofence screen”',
    },
    back_devcie_detail: {
      description: 'Back to Devcie Detail',
    },
  },
  tracking_mode: {
    close_tracking_mode_modal: {
      description: 'Close Icon, close modal Tracking mode setting',
    },
    full_tracking_mode: {
      description: 'Full tracking mode option tab',
    },
    battery_saver_mode: {
      description: 'Go to battery saver mode tab',
    },
  },
  full_tracking_mode: {
    enable_auto_update_tracking: {
      description: '',
    },
    enable_1_minute_tracking: {},
    enable_2_minute_tracking: {},
    enable_5_minute_tracking: {},
    enable_10_minute_tracking: {},
    enable_30_minute_tracking: {},
    enable_1_hours_tracking: {},
    enable_2_hours_tracking: {},
    enable_4_hours_tracking: {},
  },
  battery_saver_mode: {
    hibernation_battery_mode: {
      description: 'Go to Hibernation tab',
    },
    timer_battery_mode: {
      description: 'Go to Timer tab',
    },
    scheduler_battery_mode: {
      description: 'Go to Scheduler tab',
    },
  },
  hibernation_battery_mode: {
    full_change_mode_hibernate: {
      description: 'Restore tracker to receive automatic updates',
    },
    update_location_2hours_hibernate: {
      description: 'Update location every 2 hours',
    },
    update_location_3hours_hibernate: {
      description: 'Update location every 3 hours',
    },
  },
  subscriptions_modal: {
    close_subscription_modal: {
      description: 'Close subsctiption modal and back to device setting',
    },
    alert_limit_subscription: {
      description: 'Go to Increase your mothly text alert limmit page',
    },
    fast_tracking_subscription: {
      description: 'Go to Fast tracking page',
    },
    cancel_subscription: {
      description: 'Go to Cancel Subsctiption page',
    },
  },
  contact_list_sidebar: {
    add_new_contact: {
      description: 'Go to Add new Contact for device modal',
    },
    close_add_contact_sidebar: {
      description: 'Close Contact list sidebar and back to Setting devive',
    },
    assign_contact_speed_limit: {
      description:
        'Select contact and add these list contact to Speed Limit Alerts',
    },
    assign_contact_moving_start: {
      description:
        'Select contact and add these list contact to Speed Moving Alerts',
    },
    assign_contact_low_battery: {
      description:
        'Select contact and add these list contact to Low Battery Alerts',
    },
    assign_contact_zone_entry: {
      description:
        'Select contact and add these list contact to Geo-Fence entry Alert',
    },
    assign_contact_exit_entry: {
      description:
        'Select contact and add these list contact to Geo-Fence exit Alert',
    },
    search_contact: {
      description: 'search contact in list contacts',
    },
  },
  add_new_contact_modal: {
    contact_type_email: {
      description: 'add New Contact by type Email',
    },
    contact_type_phone: {
      description: 'add New Contact by type Receive SMS',
    },
    add_contact_type_email: {
      description: 'add New Contact by Email after fill Email and Name.',
    },
    add_contact_type_phone: {
      description: 'Add New Contact by Phone after fill Name and Phone number',
    },
    close_add_contact_modal: {
      description: '',
    },
  },
  history_device: {
    back_devcie_detail: {
      description: 'Back to Device Detail',
    },
    history_device_select_date: {
      description:
        'Select Date to filter list history log result esist in Date range',
    },
    history_device_select_gps_type: {},
    history_device_select_wifi_type: {},
    history_device_select_gps_wifi_type: {},
    history_device_wiew_history: {
      description: 'View History on map',
    },
  },
  geofences_device: {
    back_devcie_detail: {
      description: 'Back to Device Detail',
    },
    add_geofence_device: {},
    linked_geofence_device_tab: {},
    unlinked_geofence_device_tab: {},
  },
  linked_geofence_device_tab: {
    linked_geofence_add_contact: {
      description: 'Go to Contact list Sidebar',
    },
    linked_geofence_unlink_geofence: {
      description: 'Unlink geofence added a device',
    },
    linked_geofence_edit_geofence: {
      description: 'Go to Edit geofence sidebar',
    },
  },
  unlinked_geofence_device_tab: {
    unlinked_geofence_add_contact: {
      description: 'Add contact to geofence',
    },
    unlinked_geofence_edit_geofence: {
      description: 'Go to Edit geofence sidebar',
    },
    linked_geofence_link_geofence: {
      description: 'Link geofence added a device',
    },
  },
  add_geofence: {
    geofence_square_shape: {},
    geofence_circle_shape: {},
    geofence_polygon_shape: {},
    select_geofence_color: {},
    create_new_geofence: {},
    cancel_new_geofence: {},
  },
  edit_geofence: {
    cancel_clone_geofence: {},
    update_clone_geofence: {},
    geofence_square_shape: {},
    geofence_circle_shape: {},
    geofence_polygon_shape: {},
  },
  delete_geofence: {},
  // end trackers page
  geofence_page: {
    search_geofence: {
      description: 'Search Geofence in Device List',
    },
    add_geofence: {
      description: 'Go to Add Geofence page',
    },
    edit_geofence: {},
  },
  notification_page: {},
  dashboard_page: {},
  tracking_page: {},
  reports_page: {},
  contact_page: {},
  settings_page: {},
  stores_page: {},
  wallet_page: {},
  add_tracker_page: {},
};
