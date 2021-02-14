import { defineEnum, Enum } from "../../other.js";

QUnit.module('other/Enum test', function() {
    let Colors = defineEnum('Colors',
        'Red', 'Green', 'Blue'
    );
    QUnit.test("test simple enum construction", function(assert) {
        assert.ok(Colors !== undefined);
        assert.ok(Colors !== null);
        assert.ok(Colors.name == "Colors", "enum type knows it's own name");
        assert.ok(Colors.Red === Colors.values.Red, 'values.[property] same as enum.[property]');
        assert.ok(Colors.Green === Colors.values.Green);
        assert.ok(Colors.Blue === Colors.values.Blue);

        let counter = 0;
        for (let color of Colors.values) {
            if (counter == 0)
                assert.ok(color == Colors.Red, 'can iterate through values');
            else if (counter == 1)
                assert.ok(color == Colors.Green);
            else if (counter == 2)
                assert.ok(color = Colors.Blue);
            counter++;
        }
        for (let color of Colors.keys) {
            if (counter == 0)
                assert.ok(color == "Red", 'can iterate through keys');
            else if (counter == 1)
                assert.ok(color == "Green");
            else if (counter == 2)
                assert.ok(color = "Blue");
            counter++;
        }

        assert.ok(Colors.Red == 0, 'enum values evaluate to their automatically set number values');
        assert.ok(Colors.Green == 1);
        assert.ok(Colors.Blue == 2);
        assert.ok(Colors.Red.ordinal == 0, 'enum values have ordinals automatically set');
        assert.ok(Colors.Green.ordinal == 1);
        assert.ok(Colors.Blue.ordinal == 2);
        assert.ok(Colors.Red.hashCode() == 0, 'enum values have hashCode()');
        assert.ok(Colors.Green.hashCode() == 1);
        assert.ok(Colors.Blue.hashCode() == 2);
        assert.ok(Colors.Red.name == "Red", "enum values know their own name");
        assert.ok(Colors.Green.name == "Green");
        assert.ok(Colors.Blue.name == "Blue");
        assert.ok(Colors.Red.enumName == "Colors", "enum values know their type name");
        assert.ok(Colors.Green.enumName == "Colors");
        assert.ok(Colors.Blue.enumName == "Colors");
        assert.ok(Colors.Red.description == "Colors.Red", "enum values have full description");
        assert.ok(Colors.Green.description == "Colors.Green");
        assert.ok(Colors.Blue.description == "Colors.Blue");

        assert.ok(Colors.Green + Colors.Blue == 3, 'enum value math works');

        assert.ok(Colors.Red instanceof Colors, 'enum values instance of enum type');
        assert.ok(Colors.Green instanceof Colors);
        assert.ok(Colors.Blue instanceof Colors);

        assert.ok(Colors.Red instanceof Enum, 'enum values instance of Enum');
        assert.ok(Colors.Green instanceof Enum);
        assert.ok(Colors.Blue instanceof Enum);

        assert.throws(function() {
            Colors.Black = "hey";
        }, TypeError, 'cannot add properties to enum types');

        assert.throws(function() {
            Colors.Blue.name = "hey";
        }, TypeError, 'cannot change existing enum value properties');

        assert.throws(function() {
            Colors.Green.x = 20;
        }, TypeError, 'cannot add properties to enum values');
    });

    QUnit.test('test object constuctors', function(assert) {
        let Directions = defineEnum('Directions', { North: 0 }, { East: 1 }, { South: 2 }, { West: 4 });
        assert.ok(Directions.West == 4);
    });
    QUnit.test('skipping numbers', function(assert) {
        let testEnum = defineEnum('test', 'a', 'b', { c: 0 }, 'd');
        assert.ok(testEnum.a == 0);
        assert.ok(testEnum.b == 1);
        assert.ok(testEnum.c == 0);
        assert.ok(testEnum.d == 1);

        assert.ok(testEnum.a.ordinal == 0);
        assert.ok(testEnum.b.ordinal == 1);
        assert.ok(testEnum.c.ordinal == 2);
        assert.ok(testEnum.d.ordinal == 3);
    });
});