import { Serializable,Types } from "../../other.js";
import { PathTester, ProfileResultCode } from "../../PathFinding.js";

QUnit.module("PathFinding/PathTester tests", function() {
    QUnit.test("statics", function(assert) {
        assert.ok(Types.isImplementedBy(Serializable,PathTester));
    });

    QUnit.test("constructor",function(assert){
        let pt = new PathTester();
        assert.equal(pt.ParentManager,null);
        assert.equal(pt.PathDice,null);
        assert.equal(pt.ManualStartCoords,null);
        assert.equal(pt.ManualGoalCoords,null);  // Used for manual testing
        assert.equal(pt.ManualPath,null);
        assert.equal(pt.ManualProfileGroup,null);
        assert.equal(pt.CurrentProfileGroup,null);
        assert.ok(Array.isArray(pt.ProfileGroupList));
        assert.ok(Array.isArray(pt.TestCoords));
        assert.ok(Array.isArray(pt.StartCoordsList));
        assert.ok(Array.isArray(pt.GoalCoordsList));
        assert.equal(pt.ProfileGroupList.length,0);
        assert.equal(pt.TestCoords.length,0);
        assert.equal(pt.StartCoordsList.length,0);
        assert.equal(pt.GoalCoordsList.length,0);
        assert.equal(pt.TestingIterations,0);
        assert.equal(pt.Basic,null);
    });

    QUnit.test.todo("Initialize",function(assert){});
    QUnit.test.todo("readObject",function(assert){});
    QUnit.test.todo("collectTestCoords",function(assert){});
    QUnit.test.todo("createTestSuite",function(assert){});
    QUnit.test.todo("getRandomPassableCoordinate",function(assert){});
    QUnit.test.todo("profileManualPath",function(assert){});
    QUnit.test.todo("runPathTestSuites",function(assert){});
    QUnit.test.todo("testSuite",function(assert){});
    QUnit.test.todo("runHeuristicTestSuite",function(assert){});
});

QUnit.module("PathFinding/PathTester Profile class",function(){
    QUnit.test.todo("statics",function(assert){   });
    QUnit.test.todo("constructor",function(assert){   });
});

QUnit.module("PathFinding/PathTester GroupProfile class",function(){
    QUnit.test.todo("statics",function(assert){   });
    QUnit.test.todo("constructor",function(assert){   });
    QUnit.test.todo("Analyze",function(assert){   });
});

QUnit.module("PathFinding/PathTester ProfileResultCode enum",function(){
    QUnit.test("enum values",function(assert){
        assert.equal(ProfileResultCode.PATH_CODE_NO_DATA,0);
        assert.equal(ProfileResultCode.PATH_CODE_SUCCESS,1);
        assert.equal(ProfileResultCode.PATH_CODE_FAILUTE_UNITIALIZED,2);
        assert.equal(ProfileResultCode.PATH_CODE_FAILURE_INVALID_LOCATION,3);
        assert.equal(ProfileResultCode.PATH_CODE_FAILURE_NO_CONNECTION,4);
        assert.equal(ProfileResultCode.PATH_CODE_FAILURE_UNKNOWN,5);
    });
});