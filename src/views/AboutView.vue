<template>
  <h1>This is an about page</h1>

  <Editor api-key="7eksu0eilv6lniplgy9ht3rqyqzmt32j5iowwzdxk15vvqco" :init="init" />
</template>

<script setup>
import { reactive } from 'vue'
import Editor from '@tinymce/tinymce-vue'

const init = reactive({
  plugins: 'lists link image table code help wordcount',
  content_css: 'tinymce-5', //主题tinymce-5-dark || tinymce-5 || default || writer || document || dark
  custom_undo_redo_levels: 50, //回退数量
  end_container_on_empty_block: true, //块级文本是否换行
  keep_styles: true, //回车是否保存原有样式，例如code块回车是否截断
  menubar: false, //是否开启顶部菜单 > false 关闭菜单 |  'edit insert view format table tools help' 菜单按照这里排序 | 参考:https://www.tiny.cloud/docs/tinymce/6/menus-configuration-options/
  toolbar_mode: 'wrap', //功能栏是否换行 > | wrap 换行  | scrolling 滚动 | sliding 省略

  toolbar_location: 'top', //菜单栏位置 > bottom 底部 | top 顶部
  style_formats_merge: true, //是否开启默认功能
  elementpath: false, //是否展示编辑层级  > p span
  resize: true, //调整宽高 > true 调整高 | false 不可调整宽高 | both 宽高可调
  language: 'zh_CN', //中文

  // 自定义快捷将
  text_patterns: [
    { start: '---', replacement: '<hr/>' },
    { start: '--', replacement: '—' },
    { start: '-', replacement: '—' },
    { start: '(c)', replacement: '©' },
    { start: '//brb', replacement: 'Be Right Back' },
    {
      start: '//h',
      replacement:
        '<h1 style="color: blue">Heading here</h1> <h2>Author: Name here</h2> <p><em>Date: 01/01/2000</em></p> <hr />'
    }
  ],

  // 自定义指令
  text_patterns_lookup: (ctx) => {
    const parentTag = ctx.block.nodeName.toLowerCase()
    if (parentTag === 'pre' || parentTag === 'p') {
      return [{ start: '`', end: '`', format: 'code' }]
    } else if (parentTag === 'p') {
      return [{ start: '*', end: '*', format: 'bold' }]
    } else if (parentTag === 'span') {
      return [
        // ctx.text is the string from the start of the block to the cursor
        { start: 'brb', replacement: ctx.text + ': Be Right Back' }
      ]
    } else {
      return []
    }
  }
})
</script>
