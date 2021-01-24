// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "'https://pokedextracker.com/api/captures?dex=169280'", true);


  xhr.onreadystatechange = function () {
      console.log('xhr', xhr);
      if (xhr.readyState == 4) {
          console.log(xhr.responseText);
      }
  }
  xhr.send();
  console.log('xhr resp?', xhr)
  chrome.storage.sync.set({color: '#ccc'}, function() {
    console.log('The color is grey.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.wikidex.net'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
