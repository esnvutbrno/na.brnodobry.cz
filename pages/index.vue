<template>
  <client-only>
    <div class="max-w-xl mx-auto">
      <div
        v-if="showCountdown"
        class="
          text-center text-2xl text-primary dark:text-white
          font-bold my-10 sm:my-20
        "
      >
        Brno gonna be dobrý in <br>
        <Countdown
          :end-time="countdownTo"
          class=""
        />
      </div>

      <YoutubeVideo
        v-if="currentEvent && currentEvent.fields.youtube"
        :id="currentEvent.fields.youtube"
        :title="currentEvent.fields.title"
      />

      <nuxt-link
        v-if="currentEvent"
        :to="{name:'event-id', params: {id: currentEvent.sys.id}}"
        class="
        text-center text-2xl sm:text-4xl text-primary dark:text-white
        font-bold my-10 sm:my-20 block hover:underline
      "
      >
        right now: {{ currentEvent.fields.title }}
        <span v-if="currentEvent.fields.till" class="whitespace-nowrap">till {{ currentEvent.fields.till }}</span>
      </nuxt-link>
      <nuxt-link
        v-if="nextEvent"
        :to="{name:'event-id', params: {id: nextEvent.sys.id}}"
        class="
        text-center text-lg dark:text-white
        font-bold my-10 sm:my-20 block hover:underline
      "
      >
        next event: {{ nextEvent.fields.title }} from <span class="whitespace-nowrap">{{ nextEvent.fields.from }}</span>
      </nuxt-link>

      <Announcements/>

      <!--    -->
      <!--    <article class="text-lg text-justify" v-for="i in new Array(5)">-->
      <!--      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore minus soluta. Dolore explicabo illo magnam-->
      <!--      molestiae, obcaecati qui? Assumenda commodi laudantium modi numquam quas repudiandae sint. Magni provident, quae.-->

      <!--      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore minus soluta. Dolore explicabo illo magnam-->
      <!--      molestiae, obcaecati qui? Assumenda commodi laudantium modi numquam quas repudiandae sint. Magni provident, quae.-->

      <!--      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et inventore minus soluta. Dolore explicabo illo magnam-->
      <!--      molestiae, obcaecati qui? Assumenda commodi laudantium modi numquam quas repudiandae sint. Magni provident, quae.-->
      <!--    </article>-->
    </div>
  </client-only>
</template>

<script>
import {DateTime} from '@/utils/date';
import {mapGetters, mapState} from 'vuex'

export default {
  name: "IndexPage",
  computed: {
    ...mapGetters('events', [
      "currentEvent",
      "nextEvent",
    ]),
    ...mapState('events', [
      'startTime',
      'now',
      'events',
    ]),
    countdownTo() {
      return DateTime.fromISO(this.startTime)
    },
    showCountdown() {
      return DateTime.fromISO(this.now) < this.countdownTo
    },
  },
}
</script>


