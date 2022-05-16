<template>
  <div class="get-post mt-md">
    <div class="get-post__post-container mb-md" v-for="orderItem in orderItems" :key="orderItem.id">
      <p><span class="text-bold mr-xs">Order Id:</span> {{ orderItem.id }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs truncate">Product Id:</span> {{ orderItem.product_id  }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs">Product Category:</span> {{ orderItem.product_category  }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs">Price:</span>${{ orderItem.price  }}</p>
      <p class="mt-sm"><span class="text-bold mr-xs">Shipping limit date:</span>
        {{ new Date(orderItem.date).toLocaleDateString(undefined, options) }}
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { convertToNumber } from '@/helper/functionHelpers.js'

export default {
  setup (props, { emit }) {
    const orderItems = ref([])
    const store = useStore()
    const route = useRoute()
    const toast = useToast()
    const fetchOrderItems = async () => {
      const sort = route.query.sort ? route.query.sort : process.env.VUE_APP_PAGINATION_SORT_DEFAULT
      let limit = route.query.limit ? route.query.limit : process.env.VUE_APP_PAGINATION_LIMIT // as at last count
      let page = route.query.page ? route.query.page : 1
      const order = route.query.order ? route.query.order : process.env.VUE_APP_PAGINATION_ORDER_DEFAULT
      page = convertToNumber(page)
      limit = convertToNumber(limit)

      let offset
      if (page) {
        offset = (limit * page) - limit
      }
      try {
        emit('changeShowLoaderStatus', true)
        const response = await store.dispatch('fetchOrderItems', { sort, limit, offset, order })
        orderItems.value = response.data.data
        emit('changeShowLoaderStatus', false)
      } catch (err) {
        toast.error(err)
        emit('changeShowLoaderStatus', false)
      }
    }
    onMounted(async () => {
      await fetchOrderItems()
    })

    return {
      orderItems
    }
  }
}
</script>

<style lang="scss" scoped>
.truncate {
  text-overflow: ellipsis;
}
.get-post {
  max-width: 95%;
  padding: 2rem 1rem;
  cursor: pointer;
  @include grid-justify-content;
  grid-template-columns: repeat(auto-fill, 100%);
  @include margin-center;
  @include tablet-landscape-up {
    max-width: 90%;
    grid-template-columns: repeat(auto-fill, 30%);
  }
  @include desktop-up {
    max-width: 80%;
    grid-template-columns: repeat(auto-fill, 22%);
  }
  &__post-container {
    min-width: 22%;
    padding: 1.5rem 2rem;
    font-size: $font-size-small;
    box-shadow: $box-shadow-card;
    transform: translateY(0);
    transition: 250ms transform ease-out;
    margin-top: 2rem;
    &:hover {
      transform: translateY(-1rem)
    }
  }
  &__post-btn {
    padding: 1rem;
    width: 7rem;
    border-radius: 1rem;
  }
}

</style>
