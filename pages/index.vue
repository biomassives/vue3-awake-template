<template>
  <div id="home-page" class="page-wrapper home-page">
    
    <main-section theme="one-column">
     <div
      class="p-5 text-center bg-image"
      style="
         background-image: url('https://ecocity.com/_nuxt/uploads/5aea195-1024.jpg');
         height: 100%;
         background-position: center;
         background-repeat: no-repeat;
         background-size: cover;
      "
    >
    </div>
      <div class=midheader>
<button>
    Cycle</button>
<button>
    Recycle</button>
<button>
    Conserve</button>
<button>
    Harvest</button>
<button>
    Generate</button>
<button>
    Compost</button>
<button>
    Preserve</button>
<button>
    Plant</button>
<button>
    Educate</button>
<button>
    Share</button>
<button>
    Reduce</button>
<button>
    Protect</button>
<button>
    Sustain</button>
<button>
    Reuse</button>
<button>
    Save</button>
<button>
    Nurture</button>
</div>
        
      <template v-slot:default>
        <!-- All Posts -->
        <posts-grid />
      </template>
      <template v-slot:sidebar>
        Nothing here
      </template>
    </main-section>
    <news-letter-form-modal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setPageData } from '../helper'
import NewsLetterFormModal from '~/components/NewsLetterFormModal'

export default {
  name: 'HomePage',
  head() {
    return {
      title: `Home | ${this.$siteConfig.siteName}`
    }
  },
  components: {
    NewsLetterFormModal
  },
  computed: {
    ...mapState(['title', 'subtitle', 'featureImage'])
  },
  fetch({ store, params }) {
    setPageData(store, { slug: 'home' })
  }
}
</script>

<style>
.home-page .under-subtitle {
  border-top: none;
}
</style>
