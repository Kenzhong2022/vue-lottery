<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="lottery-app" :class="currentTheme">
    <!-- 主题侧边栏 -->
    <div class="theme-sidebar" :class="{ 'sidebar-open': showSidebar }">
      <div class="sidebar-header">
        <h3>主题设置</h3>
        <button class="close-btn" @click="showSidebar = false">×</button>
      </div>

      <div class="theme-section">
        <h4>配色主题</h4>
        <div class="theme-options">
          <div
            v-for="theme in themes"
            :key="theme.name"
            class="theme-option"
            :class="{ 'active': currentTheme === theme.name }"
            @click="setTheme(theme.name)"
          >
            <div class="theme-preview" :style="{ background: theme.primary }"></div>
            <span>{{ theme.label }}</span>
          </div>
        </div>
      </div>

      <div class="theme-section">
        <h4>动画速度</h4>
        <div class="speed-control">
          <input
            type="range"
            min="50"
            max="200"
            v-model="animationSpeed"
            @input="updateSpeed"
          />
          <span>{{ animationSpeed }}ms</span>
        </div>
      </div>
    </div>

    <!-- 主题切换按钮 -->
    <button class="theme-toggle" @click="showSidebar = !showSidebar">
      <span class="icon">🎨</span>
    </button>

    <!-- 主要内容 -->
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
       开始抽奖
      </el-button>
    </div>
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
      sequence: [0, 1, 2, 5, 8, 7, 6, 3],
      showSidebar: false,
      currentTheme: 'default',
      animationSpeed: 100,
      themes: [
        { name: 'default', label: '默认绿', primary: '#07C160' },
        { name: 'blue', label: '海洋蓝', primary: '#1890ff' },
        { name: 'purple', label: '梦幻紫', primary: '#722ed1' },
        { name: 'orange', label: '活力橙', primary: '#fa8c16' },
        { name: 'pink', label: '浪漫粉', primary: '#eb2f96' },
        { name: 'dark', label: '暗夜黑', primary: '#262626' }
      ]
    }
  },
  methods: {
    generateTargetSteps () {
      const firstArray = [12, 20, 28, 36, 44]
      const secondArray = [15, 23, 31, 39, 47]
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

      // 计算当前位置在序列中的索引
      const currentPositionInSequence = this.sequence.indexOf(this.activeIndex)
      console.log(`当前位置在序列中的索引：${currentPositionInSequence}`)

      // 计算从当前位置回到第一格(索引0)还需要几步
      const stepsToFirstGrid = (this.sequence.length - currentPositionInSequence) % this.sequence.length
      console.log(`从当前位置回到第一格还需要：${stepsToFirstGrid}步`)

      // 生成基础目标步数
      const baseTargetSteps = this.generateTargetSteps()

      // 将回到第一格的步数加到总步数中
      this.targetTotalSteps = baseTargetSteps + stepsToFirstGrid

      console.log('=== 开始抽奖 ===')
      console.log(`基础目标步数：${baseTargetSteps}`)
      console.log(`回到第一格需要步数：${stepsToFirstGrid}步`)
      console.log(`调整后的总目标步数：${this.targetTotalSteps}`)
      console.log('开始移动...')

      const timer = setInterval(() => {
        this.step++

        // 从当前位置开始计算移动
        const currentSequenceIndex = (currentPositionInSequence + this.step) % this.sequence.length
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
      }, this.animationSpeed)
    },

    resetLottery () {
      console.log('中奖后重置：步数重置为0，保持在当前位置')
      this.step = 0
      // 不重置activeIndex，保持在当前位置
    },

    setTheme (themeName) {
      this.currentTheme = themeName
      localStorage.setItem('lottery-theme', themeName)
    },

    updateSpeed () {
      localStorage.setItem('lottery-speed', this.animationSpeed)
    }
  },
  mounted () {
    // 从本地存储恢复主题设置
    const savedTheme = localStorage.getItem('lottery-theme')
    if (savedTheme) {
      this.currentTheme = savedTheme
    }

    const savedSpeed = localStorage.getItem('lottery-speed')
    if (savedSpeed) {
      this.animationSpeed = parseInt(savedSpeed)
    }
  }
}
</script>

<style scoped>
.lottery-app {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: all 0.3s ease;
}

/* 主题侧边栏 */
.theme-sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
  overflow-y: auto;
}

.sidebar-open {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.sidebar-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.theme-section {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.theme-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
}

.theme-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.theme-option {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-option:hover {
  border-color: #ddd;
}

.theme-option.active {
  border-color: var(--primary-color);
  background: rgba(var(--primary-color-rgb), 0.1);
}

.theme-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
}

.theme-option span {
  font-size: 14px;
  color: #333;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.speed-control input[type="range"] {
  flex: 1;
}

.speed-control span {
  font-size: 14px;
  color: #666;
  min-width: 50px;
}

/* 主题切换按钮 */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 999;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.theme-toggle .icon {
  font-size: 20px;
}

/* 主要内容 */
.grid-container {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
  margin: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
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
  box-shadow: 0 0 0 3px var(--primary-color);
}

.grid-item.start-btn {
  background: var(--primary-color);
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
  box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.3);
  background: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

/* 主题变量 */
.default {
  --primary-color: #07C160;
  --primary-color-rgb: 7, 193, 96;
}

.blue {
  --primary-color: #1890ff;
  --primary-color-rgb: 24, 144, 255;
}

.purple {
  --primary-color: #722ed1;
  --primary-color-rgb: 114, 46, 209;
}

.orange {
  --primary-color: #fa8c16;
  --primary-color-rgb: 250, 140, 22;
}

.pink {
  --primary-color: #eb2f96;
  --primary-color-rgb: 235, 47, 150;
}

.dark {
  --primary-color: #262626;
  --primary-color-rgb: 38, 38, 38;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .theme-sidebar {
    width: 280px;
    right: -280px;
  }

  .theme-options {
    grid-template-columns: 1fr;
  }

  .grid-container {
    margin: 10px;
    padding: 20px;
  }
}
</style>
