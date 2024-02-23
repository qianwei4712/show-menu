<template>
  <div class="side-bar-wrapper">
    <!-- 主页面，侧边栏工具 -->
    <t-side-bar :value="sideBarIndex" @change="onSideBarChange" @click="onSideBarClick">
      <t-side-bar-item v-for="(item, index) in categories" :key="index" :value="index" :label="item.label"
        :icon="item.icon" />
    </t-side-bar>

    <div ref="wrapper" class="content" @scroll="onScroll">
      <div v-for="(item, index) in categories" :key="index" class="section">
        <div class="title">{{ item.title || item.label }}</div>
        <div class="card-group">
          <!-- 每一个菜单项 -->
          <div class="card-item" v-for="(cargo, cargoIndex) in item.items" :key="cargoIndex">
            <!-- 上面的图片 -->
            <t-image :src="cargo.image" shape="round" fit="cover" style="height: 60px;" />
            <!-- 名字和评分 -->
            <div style="display: flex;justify-content: space-between;">
              <div>{{ cargo.name }}</div>
              <div>{{ cargo.pinfen }}</div>
            </div>
            <!-- 描述内容 -->
            <div style="text-align: left;">
              {{ cargo.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      sideBarIndex: 0,
      categories: [
        {
          label: '新手上菜',
          title: '刚学的，失败率略高',
          items: [
            { name: '标题文字', pinfen: '9.3', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png', desc: '做法做法点评点评,做法做法点评点评,做法做法点评点评,做法做法点评点评,' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
          ]
        },
        {
          label: '下饭大菜',
          title: '一个菜配三碗饭',
          items: [
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
          ]
        },
        {
          label: '时令海鲜',
          title: '螃蟹和虾，其他不会做',
          items: [
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
          ]
        },
        {
          label: '家常小炒',
          title: '炒蛋炒蛋加炒蛋',
          items: [
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
          ]
        },
        {
          label: '鲜香汤羹',
          title: '不保证质量，慎点',
          items: [
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { name: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
          ]
        },
        {
          label: '特色小吃',
          title: '空气炸锅，厨房好工具',
          items: [
            { label: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { label: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { label: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { label: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
            { label: '标题文字', image: 'https://tdesign.gtimg.com/mobile/demos/example2.png' },
          ]
        },
      ]
    }
  },
  mounted() {
  },
  methods: {
    //点击侧边栏
    onSideBarClick(index) {
      this.sideBarIndex = index
    },
    //侧边栏索引变化
    onSideBarChange(obj) {
      console.log(obj)
    },
    moveToActiveSideBar() {
    }
  }

}
</script>

<style lang="less" scoped>
.side-bar-wrapper {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color-demo, #fff);

  .content {
    flex: 1;
    overflow-y: scroll;
  }

  .section {
    padding: 16px 0;
  }

  .title {
    padding-left: 20px;
    margin-bottom: 4px;
    line-height: 26px;
  }

  .image {
    width: 48px;
    height: 48px;
  }

}

.card-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 10px;

  .card-item {
    width: calc(50% - 5px);
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}

.t-side-bar {
  width: 96px;
}
</style>