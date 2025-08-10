<template>
    <div class="result-modal">
      <div class="modal-content animate__animated animate__zoomIn">
        <div class="modal-icon">
          <v-icon name="gift" />
        </div>
        <div class="modal-title">恭喜你中獎啦！</div>
        <div class="prize-name">{{ prize }}</div>
        <p>請聯繫工作人員領取獎品</p>
        <el-button
          type="success"
          class="modal-btn"
          @click="$emit('close')"
        >
          確定
        </el-button>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    prize: String
  }
}
</script>

  <style scoped>
  .result-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 20px;
    width: 80%;
    max-width: 400px;
    padding: 30px;
    text-align: center;
  }

  .modal-icon {
    width: 80px;
    height: 80px;
    background: #07C160;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .modal-icon svg {
    font-size: 40px;
    color: white;
  }

  .modal-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .prize-name {
    font-size: 28px;
    color: #07C160;
    font-weight: bold;
    margin: 15px 0;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .modal-btn {
    margin-top: 25px;
    padding: 12px 30px;
    border-radius: 50px;
    font-size: 16px;
  }
  </style>
