
<template>
  <div class="product-index-page">
    <a-card title="热门商品" class="product-box">
      <a href="javascript:;" slot="extra">more</a>
      <a-row :gutter="32">
        <a-col class="product-item" :xl="6"  :key="index" v-for="(item, index) in productList">
          <a-card
            :hoverable="true"
            :bordered="false"
          >
            <img
              class="lazy-loaded"
              alt="example"
              v-lazy-img="item.figure"
              slot="cover"
            />
            <a-card-meta
              :title="item.name">
              <template slot="description">
                <div class="desc">{{item.desc}}</div>
                <div class="a-primary-color price">
                  <span>￥{{item.price}}元</span>
                  <a-button type="primary" size="small" @click="addProductToCart(item)">放入购物车</a-button>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'productIndex',
  data () {
    return {
      productList: []
    };
  },
  methods: {
    async addProductToCart (item) {
      // this.$store.commit('shopCart/toggleShopCart', { isOpen: true });
      this.$store.dispatch('shopCart/insertSelectedProductList', { product: item });
      // this.$store.commit('shopCart/insertSelectedProductList', { product: item });
    }
  },
  async created () {
    let res = await this.$api.product.getProductList();
    this.productList = res.data.list;
  }
};
</script>

<style lang="scss" scoped>
  .product-index-page {
    .product-box {
      .product-item {
        margin-top: 20px;
      }
      .ant-card-hoverable:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.19);
      }
      .ant-card-meta {
        text-align: center;
        .desc {
          font-size: 12px;
          height: 36px;
        }
        .price {
          margin-top: 10px;
          text-align: right;
          span {
            float: left;
          }
        }
      }
    }
  }
</style>
