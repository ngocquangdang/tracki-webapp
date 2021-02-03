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

  //main page
  main_page: {
    tongle_open_sidebar: {},
    tongle_close_sidebar: {},
    zoom_in_map_tool: {},
    zoom_out_map_tool: {},
    get_current_location_map_tool: {},
    show_layer_map_tool: {},
    close_layer_map_tool: {},
    change_layer_map_tool: {},
    show_tracker_name_map_tool: {},
    hidden_tracker_name_map_tool: {},
    show_geofences_map_tool: {},
    hidden_geofence_map_tool: {},
    street_view_map_tool: {},
    reset_map_map_tool: {},
  },
  layer_map_tool: {
    street_map_layer: {},
    our_door_map_layer: {},
    light_map_layer: {},
    dark_map_map_layer: {},
    traffic_map_layer: {},
    hybrid_map_layer: {},
  },
  //end main page
  // geofence_page
  geofence_page: {
    search_geofence: {
      description: 'Search Geofence in Device List',
    },
    add_geofence: {
      description: 'Go to Add Geofence page',
    },
    edit_geofence: {},
  },
  //-------------- end geofence_page -------------//
  //-------------- notification_page -------------//
  notification_page: {
    select_tracker_notification: {},
    select_alarm_type_notification: {},
    select_date_range_notification: {},
    filter_report_notification: {},
    export_csv_notifcation: {},
    toggle_show_detail_notification: {},
    toggle_hidden_detail_notification: {},
    sort_notification: {},
  },

  select_alarm_type_notification: {
    alarm_notification_all_type: {},
    alarm_notification_start_moing_type: {},
    alarm_notification_speed_violation_type: {},
    alarm_notification_geofence_crossed_type: {},
    alarm_notification_sos_type: {},
    alarm_notification_low_battery_alert_type: {},
    alarm_notification_left_key_type: {},
    alarm_notification_right_key_type: {},
  },

  sort_notification: {
    sort_notification_by_normal: {},
    sort_notification_by_new: {},
    sort_notification_by_old: {},
    sort_notification_by_read: {},
    sort_notification_by_unread: {},
  },
  //-------------- end notification_page -------------//

  //-------------- dashboard page -------------//
  dashboard_page: {},
  //-------------- end dashboard page -------------//

  //-------------- tracking page -------------//
  tracking_page: {
    tracking_sigle_view: {},
    tracking_heat_map: {},
    tracking_multi_view: {},
    tracking_multi_screen: {},
  },
  // end tracking page -------------//

  //-------------- report page -------------//
  reports_page: {},
  //-------------- end report page -------------//

  //-------------- contact page ---------------//
  contact_page: {
    edit_contact: {},
    delete_contact: {},
    add_new_contact: {},
    cancel_edit_contact: {},
    search_contact: {},
  },
  //-------------- end contact page ---------------//

  //-------------- setting page --------------//
  settings_page: {
    setting_page_select_kph: {},
    setting_page_select_mph: {},
    setting_page_select_date_format: {},
    setting_page_select_language: {},
    activate_email_notification: {},
    deactivate_email_notification: {},
    activate_app_notification: {},
    deactivate_app_notification: {},
    setting_page_update_first_name: {},
    setting_page_update_last_name: {},
    setting_page_update_phone: {},
    setting_page_update_phone_code: {},
    change_password_page: {},
    update_settings: {},
    update_password: {},
  },
  //-------------- end setting page --------------//

  //-------------- strore page ----------------//
  stores_page: {},
  //-------------- end strore page ----------------//

  //-------------- wallet page -------------//
  wallet_page: {
    dashboard_screen: {},
    my_wallet_screen: {},
    friend_invite_screen: {},
    notification_screen: {},
    daily_bonus_screen: {},
    spin_win_screen: {},
    hourly_gift_screen: {},
  },
  dashboard_screen: {
    select_my_point: {},
    select_my_wallet: {},
    redeem_my_point: {},
    claim_point: {},
    see_more_invite_friend: {},
    copy_referal_code: {},
    share_referal_code: {},
    new_qr_referal_code: {},
    see_more_earn_point: {},
    see_more_earn_point_history: {},
    claim_point_free_via_advertisement: {},
    purchase_tracker_using_point: {},
    purchase_accesories_using_point: {},
    purchase_subscription_using_point: {},
    purchase_sms_plan_using_point: {},
    see_more_purchase_using_point: {},
  },
  tracker_item_selected: {},
  accesories_item_selected: {},
  subscriptions_item_selected: {
    subscriptions_1_month: {},
    subscriptions_6_months: {},
    subscriptions_12_months: {},
    subscriptions_24_months: {},
  },
  sms_plan_item_selected: {
    sms_plan_50_sms: {},
    sms_plan_100_sms: {},
    sms_plan_200_sms: {},
    sms_plan_500_sms: {},
  },
  my_point_screen: {},
  my_wallet_screen: {
    select_cash_in: {},
    select_cash_out: {},
    select_transaction: {},
    select_date: {},
  },
  //-------------- end wallet page -------------//
  add_tracker_page: {},
};
