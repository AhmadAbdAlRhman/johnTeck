import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// تسجيل المكونات الأساسية في ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Home() {    
  // إنشاء البيانات لدالة الجيب
    const generateSinData = () => {
      const data = [];
      const labels = [];
      for (let i = 0; i <= 360; i++) {
        labels.push(i);
        data.push(Math.sin((i * Math.PI) / 180)); // تحويل الدرجة إلى راديان
      }
      for(let i = 0 ; i < labels.length ; i++){
          console.log(labels[i]); 
      }
      return { labels, data };
    };
    const sinData = generateSinData();

    const chartData = {
      labels: sinData.labels, // المحور X
      datasets: [
        {
          label: 'sin(x)',
          data: sinData.data, // المحور Y (قيمة الجيب)
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,  // إخفاء المفتاح التوضيحي
        },
        title: {
          display: false,  // إخفاء العنوان
        },
      },
      scales: {
        x: {
          
            display: false,  // إخفاء عنوان المحور X
          
          grid: {
            display: false,  // إخفاء معلم الإحداثيات (الشبكة) للمحور Y
          },
        },
        y: {
          
            display: false,  // إخفاء عنوان المحور Y
        
          grid: {
            display: false,  // إخفاء معلم الإحداثيات (الشبكة) للمحور Y
          },
          min: -1,
          max: 1,
        },
        display: false
      },
    };
  
    return <Line data={chartData} options={options} />;
  };
  
export default Home