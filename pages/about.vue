<template>
  <div id="about-page" class="page-wrapper about-page content-page">
    <site-hero
      title="About Us"
      subtitle="Example About Page"
      image="/uploads/about-hero.jpg"
    ></site-hero>
    <main-section theme="sidebar-right">
      <template v-slot:default>
        <div class="content">
          <h3>About Ecocity</h3>
          <p>
            <strong>
              Reality testing the <code>Sustainable Community Development</code> goals of SCD Hub.
            </strong>
          </p>
          <p>
            Digging deeper into community solutions. !
          </p>

          <h3>Support for Birds and Pollinators</h3>
          <p>
            Biodiversity support can be done in many ways.  Migratory birds suffer mortality pressures due to collisions with glass,
            housecat predaction (4 billioon / year in USA alone)!  
          </p>
          <quote-card />
          <h3>Bee Safe Neighborhoods</h3>
          <p>
             Neighborhood blocks can act as very powerful buffers against pesticides on bees, butterflies. and other pollinators.
             <strong> the importance of these pollinators for the future of human and animal consumable crops cannot be known after they are lost</strong>   
            Accordingly, the b
          </p>
          <quote-card />
          <h3>Tree Care Lifecycle</h3>
          <p>
             All roles are important in the human-tree relationship.  Caring for a tree requires a lifecycle approach such that the soil, water, recognition of the tree's ecosystem's intinsic right to exist and 
            thrive.  
          </p>


          <quote-card />
          <h3>Mapping Informal Disposal Sitesr</h3>
          <p>
             All areas of the Earth have living things in the environmenet. Plastic fires cause soot and chemicals harmful to human and ecosystem health. Mapping informal disposal sites allows us to stand together
            in creating solutions in enforcement, circular economy development, new economies like composting, vermiposting, mycocomposting, insect farming, plastics chipping and moulding, important youth employment 
            and mentor-menree relationships.
          </p>
          <quote-card />
          <h3>Performing Ecosystem Viability Asements</h3>
          <p>
             All areas of the Earth have living things in the environmenet.
          </p>


          
          
        </div>

        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">
                Cool Stuff We Do
              </p>
              <p class="subtitle">
                Sooo Cool
              </p>
              <figure class="image is-1by1">
                <opti-image width="500" height="500" />
              </figure>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">
                Other Cool Things
              </p>
              <p class="subtitle">
                Just as cool
              </p>
              <figure class="image is-1by1">
                <opti-image width="500" height="500" />
              </figure>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title">
                All the cool
              </p>
              <p class="subtitle">
                that is all
              </p>
              <figure class="image is-1by1">
                <opti-image width="500" height="500" />
              </figure>
            </article>
          </div>
        </div>
      </template>

      <template v-slot:sidebar>
        <h3 class="subtitle is-4">
          Latest Posts
        </h3>
        <posts-grid :per-row="1" :number="2" />
      </template>
    </main-section>
  </div>
</template>
<script>
import QuoteCard from '~/components/cards/QuoteCard'
export default {
  head() {
    return {
      title: `About | ${this.$siteConfig.siteName}`
    }
  },
  components: { QuoteCard }
}
</script>
