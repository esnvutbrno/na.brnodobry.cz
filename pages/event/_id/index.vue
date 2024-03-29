<template>
  <article v-if="event">
    <button
      class="bg-primary text-white uppercase
      p-2 my-2 text-center rounded block w-full font-bold"
      @click="goBack"
    >
      < back to schedule
    </button>

    <h1 class="py-4 mb-4 border-b-4 border-secondary text-primary dark:text-white
        font-bold flex flex-col sm:flex-row justify-between items-center">
      <span class="text-4xl">{{ event.fields.title }}</span>
      <span class="text-3xl">
        {{ event.fields.dayName }}, {{ event.fields.from }} <template v-if="event.fields.till">– {{
          event.fields.till
        }}</template></span>
    </h1>

    <div class="flex flex-col-reverse md:flex-row justify-between gap-x-4">
      <div class="w-auto md:w-2/3 prose prose-p:text-justify dark:prose-invert">
        <YoutubeVideo
          v-if="event.fields.youtube"
          :id="event.fields.youtube"
          :title="event.fields.title"
        />

        <RichTextRenderer
          v-if="event.fields.description"
          :document="event.fields.description"
          :nodeRenderers="nodeRenderers"
        ></RichTextRenderer>
      </div>

      <div class="w-auto md:w-1/3 flex-row-reverse md:flex-col items-center">
        <img
          v-if="photo"
          :height="photo.fields.file.details.image.height"
          :src="photo.fields.file.url"
          :width="photo.fields.file.details.image.width"
          :alt="event.fields.title"
          class="w-1/2 md:w-full mx-auto"
        >
        <nuxt-link
          v-if="place && place.fields.title"
          :to="{name: 'map', hash: '#' + place.sys.id}"
          class="my-4 gap-2 flex flex-row items-center justify-center p-2 rounded border border-primary dark:border-white"
        >
          <img alt="This place" class="h-8 w-8 dark:black-to-white" src="../../../assets/svg/place.svg">
          <span
            class="text-lg font-bold"
          >
            <span v-if="event.fields.place && event.fields.place.fields.parent" class="block">
              {{ event.fields.place.fields.title }}
            </span>
            {{ place.fields.title }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </article>
</template>

<script>

import RichTextRenderer from "contentful-rich-text-vue-renderer";


export default {
  name: "EventDetailPage",
  components: {RichTextRenderer},
  data: () => ({
    nodeRenderers: {
      'embedded-asset-block': (node, key, c, next) => `${node} ${key}`,
      'hyperlink': (node, key, c, next) => {
        if (node.data.uri.startsWith('https://www.youtube.com/embed/')) {
          return c(
            'iframe',
            {
              key,
              attrs: {
                frameBorder: "0",
                allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen",
                src: node.data.uri,
                class: 'aspect-video w-full',
              }
            },
          )
        } else {
          // stolen from original renderer
          return c(
            'a',
            {
              key,
              attrs: {
                href: node.data.uri
              }
            },
            next(node.content, key, c, next)
          )
        }
      },
    },
    event: null
  }),
  head() {
    return {
      title: this.event && this.event.fields.title
    };
  },
  methods: {
    goBack() {
      window.history.length > 1 ?
        this.$router.go(-1) :
        this.$router.push({name: 'schedule'})
    }
  },
  computed: {
    photo() {
      return (this.event && this.event.fields.photo) ||
        (this.place && this.place.fields.photo) ||
        (this.event && this.event.fields.place && this.event.fields.place.fields.photo)
    },
    place() {
      const place = this.event.fields.place

      if (!place) return;
      if (place.fields.parent) return place.fields.parent;
      return place;
    }
  },
  async fetch() {
    await this.$store.commit('events/setEventInDetailId', this.$route.params.id)

    this.event = this.$store.getters['events/eventInDetail'];

    if (!this.event)
      throw new Error({statusCode: 404, message: "Specified event not found."})
  }
}
</script>

<style scoped>

</style>
