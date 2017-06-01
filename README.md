# vue-virtualscroll

Vuejs library for virtual scrolling

```
npm i vue-virtualscroll
```

```javascript
import VueVirtualScroll from 'vue-virtualscroll'
```

```html
<vue-virtual-scroll :height="30" @reachTop="reset()" @reachBottom="loadMore()">
	<div v-for="(item, index) of data" style="height: 30px">{{ index }} - {{ item.name }}</div>
</vue-virtual-scroll>
```

:height [ required ] line height of an item
@reachTop emitted when scroll reach top of the list
@reachBottom emitted when scroll reach top of the list

Don't forget :key attribute

Fell free to use complex template for items, all you need is height.
