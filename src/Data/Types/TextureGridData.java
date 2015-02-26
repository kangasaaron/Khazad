/* Copyright 2010 Kenneth 'Impaler' Ferland

This file is part of Khazad.

Khazad is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Khazad is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Khazad.  If not, see <http://www.gnu.org/licenses/> */

package Data.Types;

import Data.*;;

import Data.DataBase;
import Data.DataLibrary;

import nu.xom.Element;
import nu.xom.Elements;

/**
 *
 * @author Impaler
 */
public class TextureGridData extends DataBase {

	String FilePath;
	int TextureWidth, TextureHeight;
	int GridWidth, GridHeight;
	
	public TextureGridData() {
		
	}

	public boolean LoadData(Element TextureGridEntry, DataLibrary Library) {
		Element File = TextureGridEntry.getFirstChildElement("File", TextureGridEntry.getNamespaceURI());
		FilePath = File.getAttribute("Path").getValue();
		
		Element TextureSize = TextureGridEntry.getFirstChildElement("TextureSize", TextureGridEntry.getNamespaceURI());
		TextureHeight = Integer.parseInt(TextureSize.getAttribute("Height").getValue());
		TextureWidth = Integer.parseInt(TextureSize.getAttribute("Width").getValue());

		Element GridSize = TextureGridEntry.getFirstChildElement("GridSize", TextureGridEntry.getNamespaceURI());
		GridHeight = Integer.parseInt(GridSize.getAttribute("Height").getValue());
		GridWidth = Integer.parseInt(GridSize.getAttribute("Width").getValue());

		Element TexturesElement = TextureGridEntry.getFirstChildElement("Textures", TextureGridEntry.getNamespaceURI());
		Elements Textures = TexturesElement.getChildElements();
		DataLibrary TextureLibrary = DataManager.getDataManager().getTextureDataLibrary();
		
		for (int i = 0; i < Textures.size(); i++) {
			Element TextureEntry = Textures.get(i);

			TextureData NewTexture = new TextureData();
			NewTexture.LoadData(TextureEntry, TextureLibrary);

			NewTexture.X *= TextureWidth;
			NewTexture.Y *= TextureHeight;

			NewTexture.FilePath = this.FilePath;
			NewTexture.LoneTexture = false;
		}
		return true;
	}
	
	public boolean PostProcessing() {
		return true;
	}
}