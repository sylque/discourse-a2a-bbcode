# name: discourse-a2a-bbocde
# about: Discourse plugin to allow inserting AddToAny social buttons in topics
# version: 1.0.1
# authors: Sylvain Quendez
# url: https://github.com/sylque/discourse-a2a-bbcode

# Load styles
register_asset "stylesheets/discourse-a2a-bbocde.scss"

# Register admin settings
enabled_site_setting :discourse_a2a_bbcode_enabled

# See:
# https://meta.discourse.org/t/mitigate-xss-attacks-with-content-security-policy/104243
# https://developers.google.com/web/fundamentals/security/csp#use_case_1_social_media_widgets
extend_content_security_policy(
  script_src: ['https://static.addtoany.com']
)
