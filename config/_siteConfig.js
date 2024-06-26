/**
 * CMS Configuration
 * Alter 'netlify' in the import statment below to one of the following:
 * netlify
 */
import theCMS from '../cms/netlify/cms'

/**
 * General Site configurations
 */
export default {
  siteName: 'Ecocity project review portal',
  tagline: 'Transparent review and rewards for int\'l sustainability projects seeking support.',
  featureImage: '/uploads/home-hero.jpg',
  logo: 'logo-component', // 'logo-component', // or '/logo.svg' for regular image
  googleAnalytics: {
    on: false,
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  mainMenu: [
    {
      name: 'Project Checkin',
      link: '/about'
    },
    {
      name: 'Techniques',
      link: '/methods'
    },
    {
      name: 'Verification',
      link: '/verifiction'
    },
    {
      name: 'Biodiversity Action SBTs',
      link: '/reports'
    },
    {
      name: 'Project Portal',
      link: '/rewards',
      target: '_blank'
    }
  ],
  hero: {
    theme: 'mist' // options: mist, light, dark
  },

  // Main Layout/Style
  layout: {
    width: 'contained', // Options: contained, full
    theme: 'sidebar-right' // Options: one-column, sidebar-right, sidebar-left
  },

  // Card Layout
  cards: {
    imageDimensions: '5x4', // Options: 1x1, 5x4, 4x3, 3x2, 5x3, 16x9, 2x1, 3x1, 4x5, 3x4, 2x3, 3x5, 9x16
    theme: 'image-grid' // Options: boxes, grid, image-grid
  },

  // Disqus
  disqus: {
    on: false,
    loadingStrategy: 'button', // Options: onload, lazy, button
    siteShortName: 'ecocommunity-dao' // 'blog-danielkelly-io'
  },

  // Newsletter Subscribe
  newsletter: {
    on: true,
    heading: 'Eco ops Checkin',
    btnText: 'checkin',
    // Can be the form action on a mail chimp form, a hubspot form,
    // or any other url you want to post the form data to
    mailchimp: {
      on: false,
      formAction:
        ''
    },
    custom: {
      on: true,
      formAction: 'https://www.ecocity.com/multi'
    }
  },

  // Categories
  categories: {
    on: true,
    perPage: 6,
    imageDimensions: null, // See card.imageDimensions (can be unique for categories if set here)
    theme: null // See card.theme (can be unique for categories if set here)
  },

  // Posts
  posts: {
    on: true,
    theme: null, // See card.theme (can be unique for posts if set here)
    imageDimensions: null, // See card.imageDimensions (can be unique for posts if set here)
    displayAuthor: true,
    date: {
      display: true
    },
    perRow: 3,
    perPage: 6
  }
}

export const CMS = theCMS
