<template>
  <div class="fetch-orders mt-md">
  <!-- This is where the parameters can be altered start -->
    <div class="fetch-orders__parameter-section">
      <div class="fetch-orders__parameter-section__input-container">
        <BaseSelect
          filled
          label="Sort"
          :options="sortOptions"
          v-model="sort"
        />
      </div>
      <div class="fetch-orders__parameter-section__input-container">
        <label>Limit</label>
        <BaseInput
          ref="gender"
          v-model="limit"
          type="number"
        />
      </div>
      <div class="fetch-orders__parameter-section__input-container">
        <BaseSelect
          label="Order"
          :options="orderOptions"
          v-model="order"
        />
      </div>

    <!-- This is where the parameters can be altered end -->

  <!--  This is where the pagination starts -->
    </div>
    <div class="fetch-orders__inner-container mt-md">
      <div class="fetch-orders__post-container mb-md" v-for="orderItem in orderItems" :key="orderItem.id" @click="goToSinglePage(orderItem)">
        <p><span class="text-bold mr-xs">Order Id:</span> {{ orderItem.id }}</p>
        <p class="mt-sm"><span class="text-bold mr-xs">Product Id:</span> {{ orderItem.product_id  }}</p>
        <p class="mt-sm"><span class="text-bold mr-xs">Product Category:</span> {{ orderItem.product_category  }}</p>
        <p class="mt-sm"><span class="text-bold mr-xs">Price:</span>${{ orderItem.price  }}</p>
        <p class="mt-sm"><span class="text-bold mr-xs">Shipping limit date:</span>
          {{ new Date(orderItem.date).toLocaleDateString(undefined) }}
        </p>
      </div>
    </div>
    <div class="fetch-orders__pagination-container">
      <BasePagination
        :totalPages="totalPages"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, shallowRef } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { convertToNumber } from '@/helper/functionHelpers.js'

export default {
  name: 'OrderList',
  setup (props, { emit }) {
    const orderItems = ref([])
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    const totalNumberOfEntries = ref(0)
    const order = ref(process.env.VUE_APP_PAGINATION_ORDER_DEFAULT)
    const sort = ref(process.env.VUE_APP_PAGINATION_SORT_DEFAULT)
    const limit = ref(process.env.VUE_APP_PAGINATION_LIMIT)
    const offset = ref(0)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const perPage = ref(1)

    const orderOptions = shallowRef(['asc', 'desc'])
    const sortOptions = shallowRef(['price', 'shipping_limit_date'])

    sort.value = route.query.sort ? route.query.sort : sort.value
    limit.value = route.query.limit ? route.query.limit : limit.value
    currentPage.value = route.query.page ? route.query.page : currentPage.value
    order.value = route.query.order ? route.query.order : order.value
    currentPage.value = convertToNumber(currentPage.value)
    limit.value = convertToNumber(limit.value)

    onMounted(async () => {
      await fetchOrderItems()
    })

    const goToSinglePage = (orderItem) => {
      localStorage.setItem('orderItem', JSON.stringify(orderItem))
      router.push({ name: 'SinglePage', params: { id: orderItem.id } })
    }

    const fetchOrderItems = async () => {
      router.push({
        query:
        {
          sort: sort.value,
          limit: limit.value,
          page: currentPage.value,
          order: order.value
        }
      })
      if (currentPage.value) {
        offset.value = (limit.value * currentPage.value) - limit.value
      }

      try {
        emit('changeShowLoaderStatus', true)
        const response = await store.dispatch('fetchOrderItems', {
          sort: sort.value, limit: limit.value, offset: offset.value, order: order.value
        })
        orderItems.value = response.data.data
        totalNumberOfEntries.value = response.data.total
        totalPages.value = Math.ceil(totalNumberOfEntries.value / limit.value) // higher number of pages
        perPage.value = limit.value
        emit('changeShowLoaderStatus', false)
      } catch (err) {
        toast.error(err)
        emit('changeShowLoaderStatus', false)
      }
    }

    const onPageChange = (page) => {
      currentPage.value = page
    }

    watch([sort, limit, currentPage, order], async ([newSort, newLimit, newCurrentPage, newOrder]) => {
      router.push({
        query:
        {
          sort: newSort,
          limit: newLimit,
          page: newCurrentPage,
          order: newOrder
        }
      })

      await fetchOrderItems()
    })

    return {
      orderItems,
      currentPage,
      onPageChange,
      totalPages,
      perPage,
      goToSinglePage,
      orderOptions,
      sortOptions,
      limit,
      sort,
      order
    }
  }
}
</script>

<style lang="scss" scoped>
.fetch-orders {
  padding: 0 0 5rem 0;
  position: relative;
  &__parameter-section {
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    &__input-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  &__inner-container {
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
  &__pagination-container {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

</style>
