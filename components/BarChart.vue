<template>
    <div>
        <v-container>
            <bar-chart :data="barChartData" :options="barChartOptions" :height="200" />
        </v-container>
    </div>
</template>

<script>
    export default {

       props:{
           ClassifiedList : Array
       },
        
        data (){
            return {

                

                barChartData: {
                labels: [
                    'Announcement',
                    'Call for help',
                    'Casualty and damage',
                    'Others',
                    
                    ],
                    datasets: [
                    {
                        label: 'Total',
                        data: this.ClassifiedList,
                        backgroundColor: ['#613659','#211522','#C197D2','#D3B1C2']
                    }
                    ]
                },
                barChartOptions: {
                    responsive: true,
                    legend: {
                    display: false
                    },
                    title: {
                    display: true,
                    text: 'Tweet Analytics',
                    fontSize: 30,
                    fontColor: '#6b7280'
                    },
                    tooltips: {
                    backgroundColor: '#17BF62'
                    },
                    scales: {
                    xAxes: [
                        {
                        gridLines: {
                            display: true
                        }
                        }
                    ],
                    yAxes: [
                        {
                        ticks: {
                            beginAtZero: false
                        },
                        gridLines: {
                            display: false
                        }
                        }
                    ]
                    }
                },
            }
        },
        mounted() {
            if(this.ClassifiedList.length != 0){
                this.barChartData.datasets[0].data = this.ClassifiedList;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>