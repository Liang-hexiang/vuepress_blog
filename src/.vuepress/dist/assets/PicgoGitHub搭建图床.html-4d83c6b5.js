import { r as resolveComponent, o as openBlock, c as createElementBlock, e as createBaseVNode, f as createTextVNode, d as createVNode, a as createStaticVNode } from "./app-c2e03701.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode(
  "h1",
  {
    id: "picgogithub图床",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#picgogithub图床",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" PicgoGitHub图床")
  ],
  -1
  /* HOISTED */
);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "前言",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#前言",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 前言")
  ],
  -1
  /* HOISTED */
);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  [
    /* @__PURE__ */ createTextVNode("这篇文章主要介绍在💻"),
    /* @__PURE__ */ createBaseVNode("code", null, "windows"),
    /* @__PURE__ */ createTextVNode("系统下安装PicGo并且在🇬🇭 GitHub上创建仓库来做我们自己的个人图床。")
  ],
  -1
  /* HOISTED */
);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  [
    /* @__PURE__ */ createTextVNode("首先，什么是 "),
    /* @__PURE__ */ createBaseVNode("code", null, "Picgo"),
    /* @__PURE__ */ createTextVNode("？")
  ],
  -1
  /* HOISTED */
);
const _hoisted_5 = {
  href: "https://picgo.github.io/PicGo-Doc/zh/guide/#%E7%89%B9%E8%89%B2%E5%8A%9F%E8%83%BD",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_6 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  [
    /* @__PURE__ */ createBaseVNode("strong", null, "PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具")
  ],
  -1
  /* HOISTED */
);
const _hoisted_7 = {
  href: "https://github.com/Molunerfinn/PicGo/releases",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_8 = /* @__PURE__ */ createStaticVNode('<p>也可以在picgo网站中找到各种下载原，比如GitHub的，腾讯的，以及别的源，哪个快用哪个。</p><p><strong>应用截图</strong></p><figure><img src="https://raw.githubusercontent.com/Molunerfinn/test/master/picgo/picgo-2.0.gif" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>GitHub想必就不用做过多介绍了，一句话概括就是一个在线的代码托管平台。</p><p>Picgo支持很多的图床，比如七牛云，腾讯云等，这里我们介绍的是免费的GitHub。</p><h2 id="动手" tabindex="-1"><a class="header-anchor" href="#动手" aria-hidden="true">#</a> 动手</h2><h3 id="_1-安装picgo" tabindex="-1"><a class="header-anchor" href="#_1-安装picgo" aria-hidden="true">#</a> 1. 安装Picgo</h3><p>我选择的是2.4.0.beta版本，大家安装的时候可以选择稳定版，看个人喜好，喜欢尝试新功能的可以按照beta版，偏向于稳定的就安装稳定版。</p>', 8);
const _hoisted_16 = {
  href: "https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.1",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_17 = /* @__PURE__ */ createStaticVNode('<figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729151038685.png" alt="image-20230729151038685" tabindex="0" loading="lazy"><figcaption>image-20230729151038685</figcaption></figure><p>其余的安装过程不再赘述，因为没什么特别需要注意的地方，傻瓜式安装就可以了，不想安装在C盘的注意更改安装目录。</p><h3 id="_2-github仓库" tabindex="-1"><a class="header-anchor" href="#_2-github仓库" aria-hidden="true">#</a> 2. GitHub仓库</h3><ol><li>先登录GitHub，点击 + ，点击创建仓库</li></ol><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164849247.png" alt="image-20230729164849247" tabindex="0" loading="lazy"><figcaption>image-20230729164849247</figcaption></figure><ol start="2"><li><p>创建仓库前配置好<code>名称</code>，<code>权限</code>，模板等，因为我们要在网络上访问，所以要选择<code>Public</code>.</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164838764.png" alt="image-20230729164838764" tabindex="0" loading="lazy"><figcaption>image-20230729164838764</figcaption></figure></li></ol><p>​ 创建成功后会跳转到仓库页面</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164829442.png" alt="image-20230729164829442" tabindex="0" loading="lazy"><figcaption>image-20230729164829442</figcaption></figure><ol start="3"><li><p>生成token</p><p>token是用来验证用户身份的表示，所以要自己揣兜里，不要让别人看到。</p><p>点击右上角的头像</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164813237.png" alt="image-20230729164813237" tabindex="0" loading="lazy"><figcaption>image-20230729164813237</figcaption></figure><p>然后点击Settings</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164803602.png" alt="image-20230729164803602" tabindex="0" loading="lazy"><figcaption>image-20230729164803602</figcaption></figure><p>在左侧导航栏的最下方找到<code>Developer settings</code>,然后点击，-&gt;</p></li></ol><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164654737.png" alt="image-20230729164654737" tabindex="0" loading="lazy"><figcaption>image-20230729164654737</figcaption></figure><p>跳转到如下页面-&gt;</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729152822569.png" alt="image-20230729152822569" tabindex="0" loading="lazy"><figcaption>image-20230729152822569</figcaption></figure><p>然后，设置过期时间，权限等 -&gt;</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164637962.png" alt="image-20230729164637962" tabindex="0" loading="lazy"><figcaption>image-20230729164637962</figcaption></figure><p>最后，划到页面最底部，点击生成token：*************</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729153248698.png" alt="image-20230729153248698" tabindex="0" loading="lazy"><figcaption>image-20230729153248698</figcaption></figure><p><strong>注意:这个token只能查看一次，如果离开这个页面在返回就看不到了, 所以先保存好token</strong></p><h3 id="_3-配置picgo" tabindex="-1"><a class="header-anchor" href="#_3-配置picgo" aria-hidden="true">#</a> 3. 🛠️配置PicGo</h3><p>打开PicGo</p><p>点击图床设置，我们可以看到GitHub</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729155924896.png" alt="image-20230729155924896" tabindex="0" loading="lazy"><figcaption>image-20230729155924896</figcaption></figure><p>1️⃣：图床配置名</p><blockquote><p>可以自己随便命名</p></blockquote><p>2️⃣: 设置仓库名</p><blockquote><p>用户名/仓库名</p></blockquote><p>3️⃣:设置分支名</p><blockquote><p>一般都为main</p></blockquote><p>4️⃣: 设置token</p><blockquote><p>这里就要用到我们之前创建仓库之后设置的token了，将它填进去即可</p></blockquote><p>5️⃣: 设置存储路径</p><blockquote><p>默认的话会上传的仓库的根目录，也就是/，如果我们想要上传到仓库的某个目录下，就需要填写目录名称，并且以/结尾</p><p>比如我想上传到仓库下的blog目录下，这里就填写<code>blog/</code></p></blockquote><p>6️⃣: 设置自定义域名</p><blockquote><p>我这里没有用到自定义域名，如果读者有需要的话可以问问度娘</p></blockquote><p>配置完之后，在上传区选中GitHub</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729162854239.png" alt="image-20230729162854239" tabindex="0" loading="lazy"><figcaption>image-20230729162854239</figcaption></figure><p>到此Picgo和GitHub的图床已经配置完成了，接下来就可以快乐的将图片上传到GitHub，然后获取到链接，在远程来访问我们的图片啦。</p><h3 id="_4-typora" tabindex="-1"><a class="header-anchor" href="#_4-typora" aria-hidden="true">#</a> 4. Typora</h3><p>另外，经常使用Typora的小伙伴也可以通过Typora的偏好设置来将我们本地的图片通过PicGo来自动上传到仓库中啦</p><ol><li>点开Typora导航栏中的文件</li></ol><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729163642417.png" alt="image-20230729163642417" tabindex="0" loading="lazy"><figcaption>image-20230729163642417</figcaption></figure><ol start="2"><li><p>在偏好设置中配置PicGo</p><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164404631.png" alt="image-20230729164404631" tabindex="0" loading="lazy"><figcaption>image-20230729164404631</figcaption></figure></li></ol>', 41);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    _hoisted_3,
    _hoisted_4,
    createBaseVNode("p", null, [
      createTextVNode("picgo网站地址："),
      createBaseVNode("a", _hoisted_5, [
        createTextVNode("https://picgo.github.io/PicGo-Doc/zh/guide/#特色功能"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_6,
    createBaseVNode("p", null, [
      createTextVNode("呈上GitHub下载地址："),
      createBaseVNode("a", _hoisted_7, [
        createTextVNode("https://github.com/Molunerfinn/PicGo/releases"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_8,
    createBaseVNode("p", null, [
      createTextVNode("2.3.1稳定版："),
      createBaseVNode("a", _hoisted_16, [
        createTextVNode("https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.1"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_17
  ]);
}
const PicgoGitHub_____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "PicgoGitHub搭建图床.html.vue"]]);
export {
  PicgoGitHub_____html as default
};
