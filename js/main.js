(function ($) {
const mql = window.matchMedia('(min-width: 641px)');
const pcNavHeight = 30;
const spNavHeight = 30;
const handleMediaQuery = function (mql) {
  if (mql.matches) {
    // 641px以上の場合の処理
    /******************************
    アンカーリンク（外部からのアンカーリンク）
    ******************************/
    // DOMの全てが読み込まれてから0.2秒後に実行
    $(window).on('load', function () {
      var urlHash = location.hash;
      if (urlHash) {
        $('body,html').stop().scrollTop(0);
        setTimeout(function () {
          var target = $(urlHash);
          var position = target.offset().top - pcNavHeight;
          $('body,html').stop().animate({ scrollTop: position }, 500);
          return false;
        }, 200);
      }
    });

    /******************************
    アンカーリンク
    ******************************/
    $(function () {
      $('[href^="#"]:not(a.noscroll)').click(function () {
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - pcNavHeight;
        $("html, body").animate({ scrollTop: position }, 600, "swing");
        return false;
      });
    });
  } else {
    // 641px未満の場合の処理

    /******************************
    アンカーリンク（外部からのアンカーリンク）
    ******************************/
    // DOMの全てが読み込まれてから0.2秒後に実行
    $(window).on('load', function () {
      var urlHash = location.hash;
      if (urlHash) {
        $('body,html').stop().scrollTop(0);
        setTimeout(function () {
          var target = $(urlHash);
          var position = target.offset().top - spNavHeight;
          $('body,html').stop().animate({ scrollTop: position }, 500);
          return false;
        }, 200);
      }
    });

    /******************************
    アンカーリンク
    ******************************/
    $(function () {
      $('[href^="#"]:not(a.noscroll)').click(function () {
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - spNavHeight;
        $("html, body").animate({ scrollTop: position }, 600, "swing");
        return false;
      });
    });
  }
};

mql.addEventListener("load", handleMediaQuery, false);
handleMediaQuery(mql);

/******************************
同ページ内のリンクの場合
******************************/
$(function () {
  $('.innerNav a:not(a.noscroll)').click(function () {
    var targetLink = $(this).prop('href');
    var linkHash = targetLink.indexOf('#');
    if (linkHash) {
      var targetURL = targetLink.split('#');
      var nowPageURL = location.href;
      nowPageURL = nowPageURL.split('#');
      if (targetURL[0] == nowPageURL[0]) {//a hrefと現ページURLが同じだった場合
        var position = $('#' + targetURL[1]).offset().top - spNavHeight;
        $("html, body").animate({ scrollTop: position }, 600, "swing");
        return false;
      }
    }
  })
});
/******************************
telリンク処理
******************************/
$(function () {
  var ua = navigator.userAgent.toLowerCase();
  var isMobile = /iphone/.test(ua) || /android(.+)?mobile/.test(ua);

  if (!isMobile) {
    $('a[href^="tel:"]').on('click', function (e) {
      e.preventDefault();
    });
  }
});
/******************************
pagetop
******************************/
$(function () {
  var topBtn = $('.pagetop img');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  //スクロールしてトップ
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});
/******************************
echo.js
******************************/
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):"object"==typeof exports?module.exports=e:t.echo=e(t)}(this,function(t){"use strict";var e,n,o,r,c,a={},u=function(){},d=function(t){return null===t.offsetParent},l=function(t,e){if(d(t))return!1;var n=t.getBoundingClientRect();return n.right>=e.l&&n.bottom>=e.t&&n.left<=e.r&&n.top<=e.b},i=function(){(r||!n)&&(clearTimeout(n),n=setTimeout(function(){a.render(),n=null},o))};return a.init=function(n){n=n||{};var d=n.offset||0,l=n.offsetVertical||d,f=n.offsetHorizontal||d,s=function(t,e){return parseInt(t||e,10)};e={t:s(n.offsetTop,l),b:s(n.offsetBottom,l),l:s(n.offsetLeft,f),r:s(n.offsetRight,f)},o=s(n.throttle,250),r=n.debounce!==!1,c=!!n.unload,u=n.callback||u,a.render(),document.addEventListener?(t.addEventListener("scroll",i,!1),t.addEventListener("load",i,!1)):(t.attachEvent("onscroll",i),t.attachEvent("onload",i))},a.render=function(n){for(var o,r,d=(n||document).querySelectorAll("[data-echo], [data-echo-background]"),i=d.length,f={l:0-e.l,t:0-e.t,b:(t.innerHeight||document.documentElement.clientHeight)+e.b,r:(t.innerWidth||document.documentElement.clientWidth)+e.r},s=0;i>s;s++)r=d[s],l(r,f)?(c&&r.setAttribute("data-echo-placeholder",r.src),null!==r.getAttribute("data-echo-background")?r.style.backgroundImage="url("+r.getAttribute("data-echo-background")+")":r.src!==(o=r.getAttribute("data-echo"))&&(r.src=o),c||(r.removeAttribute("data-echo"),r.removeAttribute("data-echo-background")),u(r,"load")):c&&(o=r.getAttribute("data-echo-placeholder"))&&(null!==r.getAttribute("data-echo-background")?r.style.backgroundImage="url("+o+")":r.src=o,r.removeAttribute("data-echo-placeholder"),u(r,"unload"));i||a.detach()},a.detach=function(){document.removeEventListener?t.removeEventListener("scroll",i):t.detachEvent("onscroll",i),clearTimeout(n)},a});
// echo.init をWPでの読み込みに合わせて実行
$(function () {
  if (window.echo && typeof echo.init === 'function') {
    echo.init();
  }
});

/******************************
Swiper スライダー（フロントページ用）
******************************/
$(function () {
  if (typeof Swiper !== 'undefined') {
    var topFvSlider = document.getElementById('top_fv_slider');
    if (topFvSlider) {
      var swiper = new Swiper('#top_fv_slider', {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        speed: 3000,
        parallax: {
          enabled: true,
        },
        pagination: {
          enabled: false,
        },
        navigation: {
          enabled: false,
        },
      });
    }
  }
});

/******************************
共有ボタン（Web Share API）
MDN参考: https://developer.mozilla.org/ja/docs/Web/API/Web_Share_API
******************************/
(function () {
  // 共有データをクリップボードにコピーするフォールバック関数
  function fallbackCopyToClipboard(url) {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(url).then(function () {
        alert('リンクをクリップボードにコピーしました: ' + url);
      }).catch(function (error) {
        console.error('クリップボードへのコピーに失敗しました:', error);
        // フォールバック: テキストエリアを使用
        return copyToClipboardLegacy(url);
      });
    } else {
      return copyToClipboardLegacy(url);
    }
  }

  // 古いブラウザ用のクリップボードコピー
  function copyToClipboardLegacy(url) {
    return new Promise(function (resolve, reject) {
      var textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        var successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          alert('リンクをクリップボードにコピーしました: ' + url);
          resolve();
        } else {
          reject(new Error('コピーに失敗しました'));
        }
      } catch (err) {
        document.body.removeChild(textArea);
        console.error('コピーに失敗しました:', err);
        alert('このブラウザでは共有機能を利用できません。\nURL: ' + url);
        reject(err);
      }
    });
  }

  // 共有ボタンのクリックハンドラー（MDNの例に基づく）
  async function handleShareClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('共有ボタンがクリックされました');
    
    var button = event.currentTarget;
    var shareData = {
      title: button.getAttribute('data-share-title') || document.title,
      text: button.getAttribute('data-share-text') || '',
      url: button.getAttribute('data-share-url') || window.location.href
    };
    
    console.log('共有データ:', shareData);

    // Web Share APIが利用可能かチェック
    if (typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined') {
      // navigator.canShare()で共有可能か事前に検証（MDN推奨）
      if (typeof navigator.canShare === 'function' && !navigator.canShare(shareData)) {
        console.log('このデータは共有できません');
        fallbackCopyToClipboard(shareData.url);
        return;
      }

      try {
        console.log('Web Share APIを使用します');
        // ユーザーインタラクションから直接呼び出す必要があるため、即座に実行
        await navigator.share(shareData);
        console.log('共有が成功しました');
      } catch (error) {
        // 利用者が共有をキャンセルした場合（AbortError）はエラーとしない
        if (error.name === 'AbortError') {
          console.log('共有がキャンセルされました');
        } else {
          console.error('共有エラー:', error);
          // エラーが発生した場合はフォールバック
          fallbackCopyToClipboard(shareData.url);
        }
      }
    } else {
      console.log('Web Share APIが利用できません。フォールバック処理を実行します');
      fallbackCopyToClipboard(shareData.url);
    }
  }

  // DOMContentLoadedとjQueryの両方でイベントをバインド
  function initShareButtons() {
    var shareButtons = document.querySelectorAll('.share_btn a');
    console.log('共有ボタンの数:', shareButtons.length);
    console.log('navigator.share の存在:', typeof navigator !== 'undefined' && typeof navigator.share !== 'undefined');
    
    shareButtons.forEach(function (button) {
      // 既にイベントリスナーが追加されている場合はスキップ
      if (!button.hasAttribute('data-share-listener')) {
        button.setAttribute('data-share-listener', 'true');
        button.addEventListener('click', handleShareClick, false);
      }
    });
  }

  // DOMContentLoadedで実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShareButtons);
  } else {
    initShareButtons();
  }

  // jQueryでも実行（念のため）
  if (typeof jQuery !== 'undefined') {
    jQuery(function () {
      initShareButtons();
    });
  }
})();

})(jQuery);
