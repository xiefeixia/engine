/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


cc.FilterNode = _ccsg.Node.extend({
    _createRenderCmd: function () {
        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL)
            return new cc.FilterNode.WebGLRenderCmd(this);
        else
            return new _ccsg.Node.CanvasRenderCmd(this);            // cc.FilterNode doesn't support Canvas mode.
    },

    setBeginDrawCallback: function (callback) {
        this._beginDrawCallback = callback;
    },

    setEndDrawCallback: function (callback) {
        this._endDrawCallback = callback;
    },

    getSourceTexture: function () {
        return this._renderCmd._sourceTexture;
    },

    drawFilter: function (input, output) {
        this._renderCmd.drawFilter(input, output);
    },

    getTexture: function () {
        return this._renderCmd.getTexture();
    },

    returnTexture: function (texture) {
        this._renderCmd.returnTexture(texture);
    },

    visit: function (parentCmd) {
        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            cc.renderer.pushRenderCommand(this._renderCmd._beginCommand);
        }

        _ccsg.Node.prototype.visit.call(this, parentCmd);

        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            cc.renderer.pushRenderCommand(this._renderCmd._endCommand);
        }
    }
});

