# discourse-a2a-bbcode

Discourse plugin to allow inserting [AddToAny](https://www.addtoany.com/) 
social buttons in topics.

This plugin is especially useful when used with
[DiscPage](https://github.com/sylque/discpage). See a demo 
[here](https://www.castafiore.org/t/46) on a DiscPage static page.

## Installation

Follow 
[those directions](https://meta.discourse.org/t/install-plugins-in-discourse/19157) 
using `https://github.com/sylque/discourse-a2a-bbcode.git` as the repository URL.

## Settings

- `discourse a2a bbcode enabled`: switch the plugin on/off

- `discourse a2a bbcode categories`: limit social buttons to the provided 
  categories. Let blank to allow social buttons on any topic.

## Manual

Two bbcodes are provided: 
* `abbfollow` to insert "follow" buttons
* `abbshare` to insert "share" buttons

In the composer preview pane, those bbcodes are rendered as standard html 
links. You need to save the topic to see the actual buttons.

### abbfollow

Inserts "follow" buttons for the specified services (see 
[list 1](https://www.addtoany.com/buttons/customize/follow_buttons)) and user 
name.

```
[abbfollow services=twitter,facebook,instagram user=Grendizer]
[/abbfollow]
```

You can omit the `services` param and provide a `href` param instead. In 
that case, the only feature of the button is to open the provided url.

```
[abbfollow services=email href=https://www.grendizer.com/mailing_list_form]
[/abbfollow]
```

### abbshare

Inserts "share" buttons for the specified services (see 
[list 2](https://www.addtoany.com/services/)). The shared message will be composed 
of:
- `url` param: url to share
- content of the bbcode block: title to share

```
[abbshare services=twitter,facebook,email url=https://www.grendizer.com]
I've discovered this amazing website!
[/abbshare]
```


## Sample Markdown Code

```
# AddToAny BBCode

This is a demo of **discourse-a2a-bbocde**, a Discourse plugin that allows inserting AddToAny social buttons in topics.

**Follow us:** [abbfollow services=twitter,facebook user=PCastafiore][/abbfollow][abbfollow services=email href=https://docs.google.com/forms/d/e/1FAIpQLScrkDYdIYJtnA81Oqup828qmlHIv6oTvSE6rAczwB2gsx-gDg/viewform?usp=sf_link][/abbfollow]

**Share this page :** [abbshare services=twitter,facebook,email,plus url=https://www.castafiore.org]I've discovered this amazing website![/abbshare]
```

![](screenshot.png)
