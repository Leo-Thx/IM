<template>
	<div @mousewheel="zoom($event)" class="h-100 w-100 text-center animated fadeIn position-absolute"
		style="-webkit-user-select: none;overflow: hidden;z-index:100;top:0px;" :style="{'background-color':$store.state.theme == 'theme-layout-light'?'rgba(0,0,0,0.5)':'rgba(0,0,0,0.5)'}">
		<div class="d-flex flex-column h-100">
			<div class="d-flex w-100 justify-content-between px-2" :style="{'marginTop':marginTop}">
				<div></div>
				<div class="d-inline-flex flex-column rounded-circle bg-theme-200 cursor text-center" style="width: 40px;height:40px;"
					@click="$emit('img-src')">
					<i class="mdi mdi-close mt-2" style="font-size: 24px;line-height: 1;"></i>
				</div>
			</div>
			<div class="flex-grow-1 h-25" style="overflow: auto;" id="imgView">
				<img id="img" @load="load($event)" draggable="false" :src="src" :style="style" v-show="viewType == 1" />
				<div class="position-fixed m-auto text-center" style="left:0px;right:0px;top:48%;">
					<span class="p-1 text-white bg-dark rounded" style="font-size:12px;transition: opacity 0.2s;" :style="{opacity:scaleOpacity}">{{(scale*100).toFixed(0)}}%</span>
				</div>
			</div>
			<div class="justify-content-center py-4">
				<i class="mdi mdi-plus bg-dark rounded-circle p-2 text-white cursor" @click="zoom_in_Click" title="放大"></i>
				<i class="mdi mdi-minus bg-dark rounded-circle p-2 text-white cursor" @click="zoom_out_Click" title="缩小"></i>
				<i class="mdi mdi-repeat-once bg-dark rounded-circle p-2 text-white cursor" @click="repeat" title="原始尺寸"></i>
				<i class="mdi mdi-rotate-left bg-dark rounded-circle p-2 text-white cursor" @click="rotate_left" title="向左旋转"></i>
				<i class="mdi mdi-rotate-right bg-dark rounded-circle p-2 text-white cursor" @click="rotate_right" title="向右旋转"></i>
				<i class="mdi mdi-mouse bg-dark rounded-circle p-2 text-white cursor" @click="mouseType" v-if="viewType == 1" title="鼠标模式"></i>
				<i class="mdi mdi-trackpad bg-dark rounded-circle p-2 text-white cursor" @click="touchType" v-if="viewType == 2" title="触摸板模式"></i>
			</div>
		</div>
	</div>
</template>

<script>
import imgViewer from "./imgViewer.js";
export default imgViewer;
</script>
