<template>
  <div id="app">
    <h1>vue-virtualscroll</h1>
		<vue-virtual-scroll :height="30" style="height: 310px">
			<div v-for="(item, index) of data" :key="index" style="height: 30px">{{ index }} - {{ item.name }}</div>
		</vue-virtual-scroll>
    <select @change="setData($event.target.value)">
      <option>- Load data -</option>
      <option value="data.json">Data</option>
      <option value="tinydata.json">Tiny</option>
      <option value="bigdata.json">Big</option>
    </select>
  </div>
</template>

<script>
import axios from 'axios'
import VueVirtualScroll from '../src'

export default {
  name: 'app',
  data () {
    return {
			data: []
    }
  },
  mounted(){
    /*axios.get('/dev/data.json').then((data) => {
      this.data = data.data
    })*/
  },
  methods: {
    setData(value){
      //this.data = []
      //this.$refs.virtual.reset()
      axios.get('/dev/' + value).then((data) => {
        this.data = data.data
      })
    }
  },
  components: { VueVirtualScroll }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}

h1, h2, h3 {
  font-weight: normal;
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.t-center{
  text-align: center;
  margin: 20px;
}
</style>
