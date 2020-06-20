<template>
  <div class="shopping-cart" ref="settingDrawer">
    <a-drawer
      width="300"
      placement="right"
      title="购物车"
      :closable="false"
      @close="toggleShopCart(false)"
      :visible="isShowDrawer"
      :getContainer="() => $refs.settingDrawer"
    >
      <a-list size="large" class="product-list">
        <a-list-item :key="index" v-for="(item, index) in selectedProductList">
          <a-list-item-meta :description="`${item.price} 元 X ${item.count}`">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.figure"/>
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div><a-icon class="icon" type="close" /></div>
        </a-list-item>
      </a-list>
      <div class="open-drawer" @click="toggleShopCart(!isShowDrawer)">
        <a-badge :count="productTotal" :offset="[-30, 0]">
          <a-icon class="icon" type="shopping-cart" v-if="!isShowDrawer"  />
          <a-icon class="icon" type="close" v-if="isShowDrawer" />
        </a-badge>
      </div>
    </a-drawer>

  </div>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 购物车，一个典型的vuex实例
 */
export default {
  name: 'shopCart',
  data () {
    return {
      // isShowDrawer: true
    };
  },
  computed: {
    isShowDrawer () {
      return this.$store.state.shopCart.isOpen;
    },
    selectedProductList () {
      const list = [];
      this.$store.state.shopCart.selectedProductList.forEach((item, i) => {
        const temp = list.find((v) => v._id === item._id);
        if (temp) {
          temp.count++;
        } else {
          list.push({ ...item, count: 1 });
        }
      });
      return list;
    },
    productTotal () {
      return this.$store.getters['shopCart/productTotal'];
    }
  },
  methods: {
    toggleShopCart (isOpen) {
      this.$store.commit('shopCart/toggleShopCart', { isOpen });
    },
    hideShopCart () {
      this.$store.commit('shopCart/toggleShopCart', { isOpen: true });
    }
  },
  mounted () {
    this.toggleShopCart(true);
    setTimeout(() => {
      this.toggleShopCart(false);
    }, 16);
  }
};
</script>

<style lang="scss" scoped>
  .product-list {
    .ant-avatar-lg {
      width: 48px;
      height: 48px;
      line-height: 48px;
    }
    .ant-list-item-meta-content {
      width: 160px;
    }
    .anticon-close {
      cursor: pointer;
    }
  }
  .open-drawer {
    position: absolute;
    top: 240px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;
    .icon {
      font-size: 20px;
      color: #fff;
    }
  }
</style>
