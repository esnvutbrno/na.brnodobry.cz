<template>
  <article>
    <div
      class="flex flex-row items-center"
    >
      <h2 class="
          uppercase font-bold text-3xl
          py-4 inline-block
        ">{{ events[0].fields.dayName }}</h2>
      <span class="flex-grow bg-secondary mx-4 h-1 rounded-full"></span>
    </div>
    <ul class="
        list-disc list-outside my-4 md:my-8 mx-auto w-full max-w-lg
        divide-y sm:divide-y-0
        flex flex-col gap-y-1 sm:gap-y-0
      ">
      <li
        class="flex flex-col sm:flex-row group cursor-pointer"
        v-for="e in events"
        @click="$router.push({name: 'event-id', params: {id: e.sys.id}})"
      >
        <span class="lg:text-lg flex-grow sm:flex-grow-0">{{ e.fields.title }}</span>
        <span class="
            flex-grow group-odd:bg-gray-100 h-0.5 rounded-full self-center
            mx-4 hidden sm:block
          "></span>

        <span class="self-end flex flex-row gap-1 items-center mr-0 sm:mr-2"
              v-if="e.fields.place && e.fields.place.fields.title">
            <img src="~/assets/svg/place.svg" alt="Place" class="w-4 w-4 stroke-primary">
            {{ e.fields.place.fields.title }}
          </span>

        <time class="self-end flex flex-row gap-1 items-center min-w-auto sm:min-w-[8rem]">
          <img src="~/assets/svg/time.svg" alt="Time" class="w-3 w-3 stroke-primary">
          {{ e.fields.fromTime }}
          <template v-if="e.fields.toTime">– {{ e.fields.toTime }}</template>
        </time>
      </li>
    </ul>
  </article>
</template>

<script>
import RichTextRenderer from 'contentful-rich-text-vue-renderer';
import {createClient} from '~/plugins/contentful.js';
import _ from 'lodash'

import {DateTime, Duration} from '@/utils/date';


export default {
  name: "ScheduleDayPage",
  components: {RichTextRenderer},
  data: () => ({dayName: null}),
  async asyncData({env, params}) {
    const client = createClient();
    const events = await client.getEntries({
      content_type: 'event',
      order: 'fields.when',
    });


    const dayName = _.startCase(_.toLower(params.day));
    const filtered = _.filter(
      _.filter(events.items, 'fields.when').map(
        v => {
          const when = DateTime.fromISO(v.fields.when);
          v.fields.day = when.startOf('day').toFormat('D')
          v.fields.dayName = when.startOf('day').toFormat('cccc')
          v.fields.fromTime = when.toFormat('t').replace(':00', '')
          v.fields.toTime = v.fields.length ?
            when.plus(Duration.fromObject({minutes: v.fields.length})).toFormat('t').replace(':00', '') :
            ''
          ;
          return v;
        }
      ),
      v => v.fields.dayName === dayName
    )


    return {
      events: filtered,
      dayName,
    }
  },
  head() {
    return {
      title: this.dayName,
    };
  },
};
</script>
