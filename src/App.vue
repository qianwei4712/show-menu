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
            <t-badge :count="cargo.pinfen" :offset="[15, 15]" size="large">
              <t-image :src="cargo.image" shape="round" fit="fill" @click="openImage(cargo.image)"
                class="cargo-image" />
            </t-badge>
            <!-- 名字和评分 -->
            <div class="card-item-title">
              <div class="title-name">{{ cargo.name }}</div>
            </div>
            <!-- 描述内容 -->
            <div class="card-item-desc" @click="playVideo(cargo.video)">
              {{ cargo.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 大图 -->
    <t-image-viewer v-model:images="currentImg" v-model:visible="visible" />

    <!-- 播放视频 -->
    <t-popup v-model="videoVisible" placement="center" @close="closeVideo">
      <video width="100%" :src="currentVideo" autoplay loop controls></video>
    </t-popup>

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
      currentImg: [],//放大图片
      visible: false,//放大图片查看按钮
      currentVideo: null,//视频地址
      videoVisible: false,//看视频
      offsetTopList: [],//滚动条偏移数组
      categories: [
        {
          label: '新手上菜',
          title: '刚学的，失败率略高',
          items: [
            {
              name: '炸萝卜丸子', pinfen: '8.5',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E7%89%B9%E8%89%B2%E5%B0%8F%E5%90%83/%E7%82%B8%E8%90%9D%E5%8D%9C%E4%B8%B8%E5%AD%90.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E7%89%B9%E8%89%B2%E5%B0%8F%E5%90%83/%E7%82%B8%E8%90%9D%E5%8D%9C%E4%B8%B8%E5%AD%90.mp4',
              desc: '还没做过，不知道好不好吃'
            },
          ]
        },
        {
          label: '下饭大菜',
          title: '一个菜配三碗饭',
          items: [
            {
              name: '酸汤肥牛', pinfen: '9.3',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E4%B8%8B%E9%A5%AD%E5%A4%A7%E8%8F%9C/%E9%85%B8%E6%B1%A4%E8%82%A5%E7%89%9B.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E4%B8%8B%E9%A5%AD%E5%A4%A7%E8%8F%9C/%E9%85%B8%E6%B1%A4%E8%82%A5%E7%89%9B.mp4',
              desc: '一袋料包、肥牛卷、金针菇、莴苣、豆皮，其他随意加'
            },
            {
              name: '番茄肥牛', pinfen: '8.5',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E4%B8%8B%E9%A5%AD%E5%A4%A7%E8%8F%9C/%E7%95%AA%E8%8C%84%E8%82%A5%E7%89%9B.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E4%B8%8B%E9%A5%AD%E5%A4%A7%E8%8F%9C/%E7%95%AA%E8%8C%84%E8%82%A5%E7%89%9B.mp4',
              desc: '主味道是酸酸的，土豆和肥牛不太入味，喝汤还是可以'
            },
          ]
        },
        {
          label: '时令海鲜',
          title: '螃蟹和虾，其他不会做',
          items: [
            {
              name: '爆炒大虾', pinfen: '8.5',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E6%97%B6%E4%BB%A4%E6%B5%B7%E9%B2%9C/%E7%88%86%E7%82%92%E5%A4%A7%E8%99%BE.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E6%97%B6%E4%BB%A4%E6%B5%B7%E9%B2%9C/%E7%88%86%E7%82%92%E5%A4%A7%E8%99%BE.mp4',
              desc: '要去虾线做起来可能有点慢，要提早点菜哦'
            },
          ]
        },
        {
          label: '家常小炒',
          title: '炒蛋炒蛋加炒蛋',
          items: [
            {
              name: '番茄炒蛋', pinfen: '8.2',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E5%AE%B6%E5%B8%B8%E5%B0%8F%E7%82%92/%E7%95%AA%E8%8C%84%E7%82%92%E8%9B%8B.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E5%AE%B6%E5%B8%B8%E5%B0%8F%E7%82%92/%E7%95%AA%E8%8C%84%E7%82%92%E8%9B%8B.mp4',
              desc: '老胡最爱，一周吃五顿，顿顿都有它。'
            },
            {
              name: '金针菇炒蛋', pinfen: '7.5',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E5%AE%B6%E5%B8%B8%E5%B0%8F%E7%82%92/%E9%87%91%E9%92%88%E8%8F%87%E7%82%92%E8%9B%8B.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E5%AE%B6%E5%B8%B8%E5%B0%8F%E7%82%92/%E9%87%91%E9%92%88%E8%8F%87%E7%82%92%E8%9B%8B.mp4',
              desc: 'see you tomorrow、tomorrow！'
            },
          ]
        },
        {
          label: '鲜香汤羹',
          title: '做得少，不保证质量，慎点',
          items: [
            {
              name: '鲫鱼豆腐汤', pinfen: '7.4',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E9%B2%9C%E9%A6%99%E6%B1%A4%E7%BE%B9/%E9%B2%AB%E9%B1%BC%E8%B1%86%E8%85%90%E6%B1%A4.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E9%B2%9C%E9%A6%99%E6%B1%A4%E7%BE%B9/%E9%B2%AB%E9%B1%BC%E8%B1%86%E8%85%90%E6%B1%A4.mp4',
              desc: '一条鲫鱼太淡了，至少两条；豆腐、粉丝、娃娃菜，准备个漏勺'
            },
          ]
        },
        {
          label: '特色小吃',
          title: '空气炸锅、油炸烧烤料',
          items: [
            {
              name: '孜然肥牛', pinfen: '9.1',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E7%89%B9%E8%89%B2%E5%B0%8F%E5%90%83/%E5%AD%9C%E7%84%B6%E8%82%A5%E7%89%9B.png',
              video: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E7%89%B9%E8%89%B2%E5%B0%8F%E5%90%83/%E5%AD%9C%E7%84%B6%E8%82%A5%E7%89%9B.mp4',
              desc: '炒香菜更好吃，炒久了会有点硬。'
            },
          ]
        },
        {
          label: '甜品饮品',
          title: '啤酒、红酒、五粮液',
          items: [
            {
              name: '五黑豆浆', pinfen: '8.3',
              image: 'https://shiva.oss-cn-hangzhou.aliyuncs.com/show-menus/%E7%94%9C%E5%93%81%E9%A5%AE%E5%93%81/%E4%BA%94%E9%BB%91%E8%B1%86%E6%B5%86.png',
              video: '',
              desc: '补肾防脱发，黑米黑豆黑枸杞，芝麻桑葚加冰糖'
            },
          ]
        },
      ]
    }
  },
  mounted() {
    this.getOffsetTopList();
    this.moveToActiveSideBar(Number(this.sideBarIndex));
  },
  methods: {
    openImage(image) {
      this.currentImg = [image]
      this.visible = true
    },
    playVideo(video) {
      if (!video) {
        return false
      }
      this.currentVideo = video
      this.videoVisible = true
    },
    closeVideo() { //关闭视频
      this.currentVideo = ''
    },

    getOffsetTopList() {
      if (this.$refs.wrapper) {
        const title = this.$refs.wrapper.querySelectorAll(`.title`);
        title.forEach((item) => this.offsetTopList.push(item.offsetTop));
      }
    },

    //点击侧边栏
    onSideBarClick(index) {
      this.sideBarIndex = index
    },
    //侧边栏索引变化
    onSideBarChange(index) {
      this.moveToActiveSideBar(Number(index));
    },
    moveToActiveSideBar(index) {
      if (this.$refs.wrapper) {
        this.$refs.wrapper.scrollTop = this.offsetTopList[index] - this.offsetTopList[0];
      }
    },
    onScroll(e) {
      const threshold = this.offsetTopList[0]; // 下一个标题与顶部的距离
      const { scrollTop } = e.target;
      if (scrollTop < threshold) {
        this.sideBarIndex = 0;
        return;
      }
      const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);
      if (index > -1) {
        this.sideBarIndex = index;
      }
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
    border: 1px solid #cacaca;
    border-radius: 8px;

    .cargo-image {
      max-height: 130px;
    }

    .card-item-title {
      padding: 3px;

      .title-name {
        font-weight: bold;
        text-align: right;
      }
    }

    .card-item-desc {
      text-align: left;
      font-size: 12px;
      color: #636262;
      padding: 0 3px 5px 3px;
    }
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

.argo-image img {
  max-height: 150px !important;
}
</style>