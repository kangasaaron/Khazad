import { Renderer } from "../Renderer.js";
import { ActorRenderer } from "../Renderer/ActorRenderer.js";
import { ImageManager } from "../Renderer/ImageManager.js";
import { MapRenderer } from "../Renderer/MapRenderer.js";
import { PathingRenderer } from "../Renderer/PathingRenderer.js";
import { SelectionRenderer } from "../Renderer/SelectionRenderer.js";
import { TerrainBuilder } from "../Renderer/TerrainBuilder.js";
import { TerrainDestroyer } from "../Renderer/TerrainDestroyer.js";
import { TerrainRenderer } from "../Renderer/TerrainRenderer.js";
import { TextureManager } from "../Renderer/TextureManager.js";

QUnit.module('Renderer package', function() {
    QUnit.test("all stuff in the right spot", function(assert) {
        assert.equal(Renderer.ActorRenderer, ActorRenderer);
        assert.equal(Renderer.ImageManager, ImageManager);
        assert.equal(Renderer.MapRenderer, MapRenderer);
        assert.equal(Renderer.PathingRenderer, PathingRenderer);
        assert.equal(Renderer.SelectionRenderer, SelectionRenderer);
        assert.equal(Renderer.TerrainBuilder, TerrainBuilder);
        assert.equal(Renderer.TerrainDestroyer, TerrainDestroyer);
        assert.equal(Renderer.TerrainRenderer, TerrainRenderer);
        assert.equal(Renderer.TextureManager, TextureManager);
    });
});