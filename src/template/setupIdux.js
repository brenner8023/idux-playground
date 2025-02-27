import { getCurrentInstance } from 'vue'
import IduxCdk from '@idux/cdk'
import IduxComponents, {
  IDUX_ICON_DEPENDENCIES,
  addIconDefinitions,
  createGlobalConfig,
} from '@idux/components'

addIconDefinitions(IDUX_ICON_DEPENDENCIES)

const loadIconDynamically = (iconName) => {
  return fetch(`https://idux-cdn.sangfor.com.cn/icons/${iconName}.svg`)
    .then((res) => res.text())
}

const targetConfig = {
  target: document.body,
}

const globalConfig = createGlobalConfig({
  icon: { loadIconDynamically },
  modal: targetConfig,
  drawer: targetConfig,
  message: targetConfig,
  notification: targetConfig,
  imageViewer: targetConfig,
})

const install = (app) => {
  app.use(IduxCdk).use(IduxComponents).use(globalConfig)
}

const loadCss = () => {
  const cdkLink = document.createElement('link')
  cdkLink.rel = 'stylesheet'
  cdkLink.href = '#CDK_STYLE_HREF#'
  document.body.appendChild(cdkLink)

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '#STYLE_HREF#'
  document.body.appendChild(link)
}

export const setupIdux = () => {
  const instance = getCurrentInstance()
  instance?.appContext.app.use({ install })
  loadCss()
}
