<template>
    <div>
        <v-container>
            <pie-chart :data="barChartData" :options="barChartOptions" :height="200" />
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
                    'Casualty and damage',
                    'Call for Help',
                    'Others',
                    
                    ],
                    datasets: [
                    {
                        label: 'Length',
                        data: this.ClassifiedList,
                        backgroundColor: ['#3D5B59','#B5E5CF','#FCB5AC','#B99095']
                    }
                    ]
                },
                barChartOptions: {
                   responsive: true,
                    plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Pie Chart'
                    }
                    }
                }
            }
        },
        mounted (){
            if(this.ClassifiedList.length != 0){
                this.barChartData.datasets[0].data = this.ClassifiedList;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>