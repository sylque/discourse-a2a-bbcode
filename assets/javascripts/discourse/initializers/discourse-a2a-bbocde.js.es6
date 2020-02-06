import { withPluginApi } from 'discourse/lib/plugin-api'

export default {
  name: 'discourse-a2a-bbcode',
  initialize(container, app) {
    // If plugin is disabled, quit
    if (!app.SiteSettings['discourse_a2a_bbcode_enabled']) {
      return
    }

    // Get the categories
    const catIds = app.SiteSettings.discourse_a2a_bbcode_categories.split('|')

    withPluginApi('0.8.30', api => {
      api.decorateCooked(
        ($elem, helper) => {
          // We support social buttons in topics only, not posts
          // We also support social buttons on topics rendered with no helper,
          // such as DiscPage pages.
          if (helper && !helper.widget.attrs.firstPost) {
            return
          }

          // If the current category is not supported, hide our buttons and quit
          if (catIds[0]) {
            // If this way of getting the category doesn't work in the future,
            // we could use helper.widget.attrs.topicId
            const catHref = $('.topic-category > a.badge-wrapper').attr('href')
            const catId = catHref ? catHref.split('/').pop() : '1'
            if (!catIds.includes(catId)) {
              $elem.find('a[class^="a2a_button_"]').hide()
              return
            }
          }

          // Execute AddToAny init and rendering
          runAddToAny($elem.get(0))

          // Loop through each button
          const links = $elem.find('a[class^="a2a_button_"]')
          links.each((i, l) => {
            // Remove the link text we added to make the link visible in preview
            l.innerHTML = ''

            // At this stage, Discourse has disabled target="_blank" on the 
            // button links (not sure why), so we need to restore it
            // https://meta.discourse.org/t/open-link-in-new-window/74231/2?u=jack2
            l.addEventListener('click', e => {
              window.open(l.href)
              e.preventDefault()
            })
          })
        },
        {
          id: 'discourse-a2a-bbcode',
          onlyStream: true
        }
      )
    })
  }
}

const getScript = url =>
  new Promise((resolve, reject) => {
    $.getScript(url)
      .done((script, textStatus) => resolve(textStatus))
      .fail((jqxhr, settings, exception) => reject(exception))
  })

const runAddToAny = rootNode => {
  // Check if node is in the DOM. Node not in the DOM happens when a plugin
  // (such as DiscPage) renders a post manually
  if (!document.contains(rootNode)) {
    setTimeout(() => runAddToAny(rootNode), 200)
    return
  }

  // Case the AddToAny script has not been loaded yet
  if (typeof a2a === 'undefined') {
    getScript('https://static.addtoany.com/menu/page.js').then(
      () => {
        runAddToAny(rootNode)
      },
      e =>
        console.log("discourse-a2a-bbcode error: AddToAny script couldn't load")
    )
    return
  }

  // Case the AddToAny script has already been loaded: fire the
  // button rendering process
  rootNode
    .querySelectorAll('.abb-share > :first-child')
    .forEach(e => a2a.init('page', { target: e }))
  rootNode
    .querySelectorAll('.abb-follow > :first-child')
    .forEach(e => a2a.init('feed', { target: e }))
}
