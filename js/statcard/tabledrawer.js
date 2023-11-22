function TableDrawer(ctx, x, y, xSpacing, rowHeight, tableWidth)
{
	this.startX = x;
	this.y = y - rowHeight;
	this.x = x;
	this.rows = 0;
	
	this.addColumn = function(text, width, red)
	{
		if(!red) red = 0;
		ctx.fillStyle = "rgb("+Math.min(255, red)+", 0, 0)";
		ctx.fillText(text, this.getTableX(width), this.y, width);
		ctx.fillStyle = "black";
		this.x += width + xSpacing;
	};
	
	this.getTableX = function(width)
	{
		switch(ctx.textAlign)
		{
			case "center": return this.x + width/2;
			case "left": return this.x;
			case "right": return this.x + width;
		}
	}
	
	this.addRow = function()
	{
		this.y += rowHeight;
		this.x = this.startX;
		if(this.rows % 2 == 1)
		{
			ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
			ctx.fillRect(this.x, this.y - rowHeight, tableWidth, rowHeight);
			ctx.fillStyle = "black";
		}
		this.rows++;
	};
}