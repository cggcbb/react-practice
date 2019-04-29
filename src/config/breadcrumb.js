export const breadcrumbConfig = {
  'ui': '设计',
  'form': '表单',
  'table': '表格',
  'charts': '图表'
}

export const getBreadcrumb = ({ key, title }) => {
  let regex = /\w+(?=\/)/g
  let matches = key.match(regex) || []
  let breadcrumb = []
  breadcrumb.push({
    title: '首页',
    key: '/index'
  })
  if (matches.length === 2) {
    breadcrumb.push({
      title: breadcrumbConfig[matches[1]],
      key: matches[1]
    })
  }
  matches.length && breadcrumb.push({
    title,
    key
  })
  return breadcrumb
}