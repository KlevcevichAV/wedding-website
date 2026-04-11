<template>
  <section class="program-section">
    <h2 class="section-title">Программа дня</h2>

    <div class="timeline-container" ref="container" :style="{ height: totalHeight + 'px' }">

      <svg class="timeline-svg" viewBox="0 0 400 1000" preserveAspectRatio="none">
        <path
            id="curve"
            d="M200,0 Q380,150 200,300 T200,600 T200,900 T200,1000"
            fill="none"
            stroke="#d1d1d1"
            stroke-width="2"
        />
        <g id="heart-pointer" ref="heart">
          <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#78866b"
              transform="scale(1.2) translate(-12, -12)"
          />
        </g>
      </svg>

      <div
          v-for="(item, index) in itemsWithCoords"
          :key="index"
          :class="['program-item', index % 2 === 0 ? 'left' : 'right']"
          :style="{ left: item.x + 'px', top: item.y + 'px' }"
      >
        <div class="dot"></div>
        <div class="content">
          <span class="time">{{ item.time }}</span>
          <h3 class="title">{{ item.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted, onUnmounted, ref, nextTick} from 'vue';

const timeline = [
  {time: '15:30', title: 'Welcome zone'},
  {time: '16:00', title: 'Церемония'},
  {time: '17:00', title: 'Начало банкета'},
  {time: '18:30', title: 'Праздничный торт'},
  {time: '22:00', title: 'Завершение свадьбы и начало счастливой жизни'}
];

const heart = ref(null);
const container = ref(null);
const itemsWithCoords = ref([]); // Массив, куда мы запишем рассчитанные координаты
const totalHeight = ref(1000); // Базовая высота, подстроим её в JS

// Функция для расчета координат точек и текста
const calculateCoords = () => {
  const path = document.querySelector('#curve');
  if (!path || !container.value) return;

  const pathLength = path.getTotalLength();
  const containerWidth = container.value.offsetWidth;

  // Рассчитываем высоту контейнера на основе ширины (чтобы змейка не сжималась)
  // Мы хотим, чтобы высота была примерно в 2.5 раза больше ширины.
  totalHeight.value = Math.max(800, containerWidth * 2.5);
  const currentHeight = totalHeight.value;

  // Карта распределения пунктов по длине кривой (от 0 до 1)
  // Мы хотим оставить отступы сверху и снизу.
  const steps = [0.1, 0.3, 0.5, 0.7, 0.9];

  itemsWithCoords.value = timeline.map((item, index) => {
    // Получаем точку на SVG-кривой (в координатах viewBox 0-400)
    const svgPoint = path.getPointAtLength(steps[index] * pathLength);

    // Конвертируем SVG-координаты в пиксели экрана
    // 1. По оси X: сдвигаем от центра SVG к центру контейнера
    const xPixel = (svgPoint.x / 400) * containerWidth;

    // 2. По оси Y: масштабируем по высоте контейнера
    const yPixel = (svgPoint.y / 1000) * currentHeight;

    return {
      ...item,
      x: xPixel,
      y: yPixel
    };
  });
};

const handleScroll = () => {
  const path = document.querySelector('#curve');
  if (!path || !heart.value || !container.value) return;

  const pathLength = path.getTotalLength();
  const rect = container.value.getBoundingClientRect();
  const viewHeight = window.innerHeight;

  const scrollThreshold = rect.height * 0.9;
  const progress = (viewHeight / 2 - rect.top) / scrollThreshold;

  const scrollPercent = Math.max(0.05, Math.min(0.90, progress));

  const point = path.getPointAtLength(scrollPercent * pathLength);
  const nextPoint = path.getPointAtLength(Math.min(pathLength, scrollPercent * pathLength + 1));
  const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

  heart.value.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle - 90})`);
};

// Функция адаптации при ресайзе окна
const handleResize = () => {
  calculateCoords();
  handleScroll();
};

onMounted(async () => {
  await nextTick(); // Ждем, пока Vue отрендерит DOM

  // Даем SVG немного времени подгрузиться (критично для Safari/Arc)
  setTimeout(() => {
    calculateCoords();
    handleScroll();
  }, 150);

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.program-section {
  padding: 100px 0; /* Убрали боковые падинги секции */
  background-color: #fff;
  overflow: hidden;
}

.section-title {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  margin-bottom: 60px;
}

.timeline-container {
  position: relative;
  max-width: 800px; /* Максимальная ширина змейки */
  margin: 0 auto;
  /* Высота задается динамически в теге style контейнера */
}

.timeline-svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.program-item {
  position: absolute;
  width: 250px; /* Фиксированная ширина блока текста */
  display: flex;
  align-items: center;
  z-index: 2;
  /* Центрируем блок текста относительно рассчитанной точки X,Y */
  transform: translate(-50%, -50%);
}

/* Стилизация точки (ровно по центру .program-item) */
.dot {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* Идеально центрируем саму точку */
  width: 14px;
  height: 14px;
  background-color: #78866b;
  border-radius: 50%;
  flex-shrink: 0;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #78866b;
  z-index: 3;
}

/* Позиционирование контента */
.program-item.left {
  text-align: right;
  /* Сдвигаем контент влево, чтобы точка осталась в центре */
  justify-content: flex-end;
  padding-right: 25px; /* Отступ от точки */
}

.program-item.right {
  text-align: left;
  /* Сдвигаем контент вправо */
  justify-content: flex-start;
  padding-left: 25px; /* Отступ от точки */
}

/* Если пункт слева, сдвигаем его текст влево от точки */
.program-item.left .content {
  margin-right: 125px; /* width / 2 */
}

/* Если пункт справа, сдвигаем его текст вправо от точки */
.program-item.right .content {
  margin-left: 125px; /* width / 2 */
}

.time {
  font-size: 1.1rem;
  font-weight: 700;
  color: #78866b;
  display: block;
  margin-bottom: 4px;
}

.title {
  font-size: 1.2rem;
  margin: 0;
  line-height: 1.2;
}

/* Адаптив для мобилок */
@media (max-width: 600px) {
  .section-title {
    font-size: 2rem;
  }

  .program-item {
    width: 160px;
  }

  /* Сужаем блоки текста */
  .program-item.left .content {
    margin-right: 80px;
  }

  .program-item.right .content {
    margin-left: 80px;
  }

  .title {
    font-size: 0.9rem;
  }

  .time {
    font-size: 1rem;
  }
}
</style>