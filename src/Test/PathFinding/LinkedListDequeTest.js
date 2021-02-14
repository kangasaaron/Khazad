import { LinkedListDeque } from "../../PathFinding.js";

QUnit.module("PathFinding/LinkedListDeque tests", function() {
    QUnit.test("constructor", function(assert) {
        let deque = new LinkedListDeque();
        assert.ok("clear" in deque);
        assert.ok("insertFront" in deque);
        assert.ok("isEmpty" in deque);
        assert.ok("removeFirst" in deque);
        assert.ok("removeLast" in deque);
        assert.ok("size" in deque);

        assert.equal(deque.size(), 0);
        assert.ok(deque.isEmpty());

        let testItem = "hey";
        deque.insertFront(testItem);
        assert.equal(deque.size(), 1);
        let first = deque.removeFirst();
        assert.equal(first, testItem);
        assert.equal(deque.size(), 0);
        assert.ok(deque.isEmpty());

        deque.insertFront(testItem);
        assert.equal(deque.size(), 1);
        let last = deque.removeLast();
        assert.equal(last, testItem);
        assert.equal(deque.size(), 0);
        assert.ok(deque.isEmpty());

        let secondTestItem = "Hello";
        deque.insertFront(testItem);
        deque.insertFront(secondTestItem)
        assert.equal(deque.size(), 2);
        last = deque.removeLast();
        assert.equal(last, testItem);

        deque.clear();
        assert.equal(deque.size(), 0);


    });

});