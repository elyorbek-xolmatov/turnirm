// Dashboard uchun JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Joriy sanani ko'rsatish
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('uz-UZ', options);
    
    // Grafikalarni yaratish
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    const tournamentsCtx = document.getElementById('tournamentsChart').getContext('2d');
    
    // Foydalanuvchilar grafigi
    const usersChart = new Chart(usersCtx, {
        type: 'line',
        data: {
            labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul'],
            datasets: [{
                label: 'Foydalanuvchilar soni',
                data: [450, 580, 720, 810, 950, 1100, 1248],
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderColor: '#0d6efd',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Turnirlar grafigi
    const tournamentsChart = new Chart(tournamentsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Erangel', 'Livik', 'TDM', 'Sanhok', 'Miramar'],
            datasets: [{
                data: [12, 8, 15, 5, 3],
                backgroundColor: [
                    '#FF5722',
                    '#2196F3',
                    '#4CAF50',
                    '#FFC107',
                    '#9C27B0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
    
    // Davrni o'zgartirish
    document.querySelector('.chart-period').addEventListener('change', function() {
        const period = this.value;
        let labels, data;
        
        switch(period) {
            case 'week':
                labels = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'];
                data = [120, 150, 180, 200, 240, 210, 190];
                break;
            case 'month':
                labels = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul'];
                data = [450, 580, 720, 810, 950, 1100, 1248];
                break;
            case 'year':
                labels = ['2018', '2019', '2020', '2021', '2022', '2023'];
                data = [1200, 2500, 3800, 4200, 5800, 7500];
                break;
        }
        
        usersChart.data.labels = labels;
        usersChart.data.datasets[0].data = data;
        usersChart.update();
    });
});