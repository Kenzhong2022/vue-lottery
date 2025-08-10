<template>
  <div id="app">
    <div class="header">
      <h1>九宮格抽獎</h1>
      <div class="user-info">
        <div>
          <span>抽獎次數</span>
          <strong>{{ chances }}</strong>
        </div>
        <div>
          <span>今日已抽</span>
          <strong>{{ drawCount }}</strong>
        </div>
        <div>
          <span>中獎記錄</span>
          <strong>{{ records.length }}</strong>
        </div>
      </div>
    </div>

    <div class="lottery-section">
      <GridLottery
        ref="gridLottery"
        @draw="handleDraw"
        :chances="chances"
        :disabled="isDrawing"
      />
    </div>

    <div class="records">
      <h3><v-icon name="history" /> 抽獎記錄</h3>
      <div class="record-list">
        <div v-for="(record, index) in records" :key="index" class="record-item">
          <div class="record-prize">
            <v-icon name="gift" /> {{ record.prize }}
          </div>
          <div class="record-time">
            {{ record.time }}
          </div>
        </div>
        <div v-if="records.length === 0" class="empty-records">
          暫無抽獎記錄
        </div>
      </div>
    </div>

    <PrizeModal
      v-if="showResult"
      :prize="resultPrize"
      @close="handlePrizeModalClose"
    />
  </div>
</template>

<script>
import GridLottery from './components/GridLottery.vue'
import PrizeModal from './components/PrizeModal.vue'

export default {
  components: {
    GridLottery,
    PrizeModal
  },
  data () {
    return {

      chances: 999,
      drawCount: 0,
      records: [],
      isDrawing: false,
      showResult: false,
      resultPrize: ''
    }
  },
  methods: {
    handleDraw (prize) {
      this.chances--
      this.drawCount++

      this.resultPrize = prize.name
      this.showResult = true

      this.records.unshift({
        prize: prize.name,
        time: this.getCurrentTime(),
        type: '九宮格抽獎'
      })
    },
    getCurrentTime () {
      const now = new Date()
      return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    },

    // 处理中奖弹窗关闭事件
    handlePrizeModalClose () {
      // 先关闭弹窗
      this.showResult = false

      // 然后重置抽奖组件状态
      this.$refs.gridLottery.resetLottery()
    }
  }
}
</script>

<style>
/* 移除了无效的样式文件引用 */

#app {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #07C160 0%, #05a84e 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 6px 16px rgba(7, 193, 96, 0.3);
}

.header h1 {
  font-size: 32px;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.user-info {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 15px;
}

.user-info div {
  text-align: center;
  flex: 1;
}

.user-info span {
  display: block;
  font-size: 14px;
  opacity: 0.9;
}

.user-info strong {
  display: block;
  font-size: 24px;
  margin-top: 5px;
}

.lottery-section {
  margin-bottom: 25px;
}

.records {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
}

.records h3 {
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.record-list {
  max-height: 300px;
  overflow-y: auto;
}

.record-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
}

.record-item:last-child {
  border-bottom: none;
}

.record-prize {
  font-weight: 500;
  display: flex;
  align-items: center;
}

.record-prize svg {
  margin-right: 8px;
}

.record-time {
  color: #999;
}

.empty-records {
  text-align: center;
  padding: 30px;
  color: #999;
}

/* 移动端适配 */
@media (max-width: 768px) {
  #app {
    padding: 10px;
  }

  .header h1 {
    font-size: 24px;
  }

  .user-info {
    flex-direction: column;
    gap: 10px;
  }

  .user-info div {
    flex: none;
  }
}
</style>
