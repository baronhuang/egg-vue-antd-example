<template>
  <div class="product-list-page">
    <a-card :bordered="false">
      <a-button type="primary" icon="plus" class="add-product-btn" @click="showProductModal()">添加商品</a-button>
      <a-spin :spinning="productListLoading">
        <a-list size="large" :pagination="productPagination">
          <a-list-item :key="index" v-for="(item, index) in productList">
            <a-list-item-meta :description="item.desc">
              <a-avatar slot="avatar" size="large" shape="square" :src="item.figure"/>
              <a slot="title">{{ item.name }}</a>
            </a-list-item-meta>
            <div slot="actions">
              <a @click="showProductModal(item)">编辑</a>
            </div>
            <div slot="actions">
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item><a @click="showProductModal(item)">编辑</a></a-menu-item>
                  <a-menu-item>
                    <a-popconfirm :title="`确定要删除商品 ${item.name}？`" @confirm="deleteProductOk(item)">
                      <a href="javascript:;">删除</a>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
                <a>更多<a-icon type="down"/></a>
              </a-dropdown>
            </div>
            <div class="list-content">
              <!--<div class="list-content-item">-->
              <!--<span>创建者</span>-->
              <!--<p>Baron</p>-->
              <!--</div>-->
              <div class="list-content-item">
                <span>库存 {{item.stock}}/1000</span>
                <p><a-progress :percent="parseFloat((item.stock/1000*100).toFixed(2))"  style="width: 180px" /></p>
              </div>
              <div class="list-content-item">
                <span>修改时间</span>
                <p>{{ item.updated_at }}</p>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </a-spin>
    </a-card>

    <a-modal
      title="商品管理"
      :width="600"
      :visible="isShowProductModal"
      :confirmLoading="productModalLoading"
      @ok="productModalOk"
      @cancel="productModalCancel"
    >
      <a-spin :spinning="productModalLoading">
        <a-form :form="productForm" >
          <a-form-item style="display: none"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['_id', {}]" />
          </a-form-item>

          <a-form-item
            label="商品名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['name', {rules: [{ required: true, message: '请输入商品名' }]}]" />
          </a-form-item>

          <a-form-item
            label="商品描述"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['desc', {rules: [{ required: true, message: '请输入商品描述' }]}]" />
          </a-form-item>
          <a-form-item
            label="商品图片"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['figure', {rules: [{ required: true, message: '请输入商品图片' }]}]" />
          </a-form-item>
          <a-form-item
            label="商品价格"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input-number style="width: 100%;" :min="0" :precision="0" v-decorator="['price', {rules: [{ required: true, message: '请输入商品价格' }]}]" />
          </a-form-item>
          <a-form-item
            label="库存数量"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input-number style="width: 100%;" :min="0" :max="1000" :precision="0" v-decorator="['stock', {rules: [{ required: true, message: '请输入库存数量' }]}]" />
          </a-form-item>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>

<script>
import productList from './list';
export default productList;
</script>

<style lang="scss" scoped>
@import '@/assets/style/var.scss';
.product-list-page {
  .add-product-btn {
    margin-bottom: 10px;
  }
  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    color: $text-color-secondary;
    span {
      line-height: 20px;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
}
</style>
