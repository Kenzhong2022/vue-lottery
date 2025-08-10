<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="grid-container">
    <div class="grid-wrapper">
      <div
        v-for="(item, index) in gridItems"
        :key="index"
        class="grid-item"
        :class="{ 'active': activeIndex === index, 'start-btn': index === 4 }"
        @click="index === 4 && startDraw()"
      >
        <div class="grid-item-content">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <el-button
      type="success"
      :disabled="disabled || chances <= 0"
      @click="startDraw"
      class="draw-btn"
    >
      // eslint-disable-next-line vue/no-parsing-error
      {{ chances <= 0 ? '次數已用完' : '開始抽獎' }}
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    chances: Number,
    disabled: Boolean
  },
  data () {
    return {
      gridItems: [
        { id: 1, name: 'labubu玩偶' },
        { id: 2, name: '健身房次卡' },
        { id: 3, name: '健身房年會員8折' },
        { id: 4, name: '體檢身體報告專業分析一次' },
        { id: 5, name: '開始' },
        { id: 6, name: 'labubu玩偶' },
        { id: 7, name: '健身房次卡' },
        { id: 8, name: '健身房年會員8折' },
        { id: 9, name: '體檢身體報告專業分析一次' }
      ],
      activeIndex: 0,
      isDrawing: false,
      step: 0,
      targetTotalSteps: 0,
      sequence: [0, 1, 2, 5, 8, 7, 6, 3]
    }
  },
  methods: {
    generateTargetSteps () {
      const firstArray = [4, 12, 20, 28, 36, 44]
      const secondArray = [7, 15, 23, 31, 39, 47]
      const useFirstArray = Math.random() < 0.5

      if (useFirstArray) {
        const randomIndex = Math.floor(Math.random() * firstArray.length)
        this.targetTotalSteps = firstArray[randomIndex]
        console.log(`选择第一个数组，生成的数字：${this.targetTotalSteps}`)
      } else {
        const randomIndex = Math.floor(Math.random() * secondArray.length)
        this.targetTotalSteps = secondArray[randomIndex]
        console.log(`选择第二个数组，生成的数字：${this.targetTotalSteps}`)
      }

      return this.targetTotalSteps
    },

    drawPrize () {
      const prizeIndexes = [0, 1, 2, 3, 5, 6, 7, 8]
      const randomIndex = Math.floor(Math.random() * prizeIndexes.length)
      const targetIndex = prizeIndexes[randomIndex]
      const prize = this.gridItems[targetIndex]

      return { targetIndex, prize }
    },

    startDraw () {
      if (this.disabled || this.chances <= 0 || this.isDrawing) return

      this.isDrawing = true
      const targetSteps = this.generateTargetSteps()

      console.log('=== 开始抽奖 ===')
      console.log(`随机生成的目标总步数：${targetSteps}`)
      console.log('开始移动...')

      const speed = 100

      const timer = setInterval(() => {
        this.step++
        const currentSequenceIndex = this.step % this.sequence.length
        this.activeIndex = this.sequence[currentSequenceIndex]

        const currentGridNumber = this.activeIndex + 1
        console.log(`移动到第${currentGridNumber}格，累计步数：${this.step}`)

        if (this.step >= this.targetTotalSteps) {
          clearInterval(timer)
          const prize = this.gridItems[this.activeIndex]

          console.log('=== 达到目标步数，中奖啦！===')
          console.log(`目标步数：${this.targetTotalSteps}，实际步数：${this.step}`)
          console.log(`最终位置：第${currentGridNumber}格`)
          console.log(`中奖奖品：${prize.name}`)

          setTimeout(() => {
            this.$emit('draw', prize)
            this.isDrawing = false
          }, 300)
        }
      }, speed)
    },

    resetLottery () {
      console.log('中奖后重置：步数重置为0，回到第1格')
      this.step = 0
      this.activeIndex = 0
    }
  }
}
</script>

<style scoped>
.grid-container {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  max-width: 350px;
  margin: 0 auto 30px;
}

.grid-item {
  background: #f8f8f8;
  border-radius: 12px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.grid-item.active {
  background: #fff;
  transform: scale(0.95);
  box-shadow: 0 0 0 3px #07C160;
}

.grid-item.start-btn {
  background: #07C160;
  color: white;
}

.grid-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-item-content span {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 1.1;
  word-break: break-all;
  padding: 2px;
}

.draw-btn {
  padding: 14px 40px;
  font-size: 16px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(7, 193, 96, 0.3);
}
</style>
