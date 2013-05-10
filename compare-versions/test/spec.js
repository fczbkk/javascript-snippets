var correctVersions = [
    '1',
    '1.2.3',
    '10.200.3000.40000.500000',
    '0.0.1',
    '000.000.001',
    '1.0.0',
    '2.0.4.0.6'
];

var wrongVersions = [
    'a',
    '1.a.2',
    '1.2b',
    'a.1'
]

var versionPairs = [
    ['1', '2'],
    ['1', '10000'],
    ['1.0.0.0.0.0.0', '10.0.0'],
    ['0', '1'],
    ['000.000.001', '000.000.002'],
    ['000.000.002', '001'],
    ['000.000.001', '002'],
    ['0.0.1', '1.0.0'],
    ['1.2.3', '4.5.6'],
    ['1.2.3', '4.5.6.7.8'],
    ['1.2.3', '1.2.3.4.5']
];

describe("Function 'compareVersions'", function() {

    it("should exist", function() {
        expect(compareVersions).toBeDefined();
    });

    it("should not work without attributes", function() {
        expect(compareVersions()).toBeNull();
    });

    it("should not work with single attribute", function() {
        expect(compareVersions('1')).toBeNull();
        expect(compareVersions(null, '1')).toBeNull();
    });

    it("should work with more than two attributes", function() {
        expect(compareVersions('1', '1', '1')).not.toBeNull();
    });
    
    it("should not work when one attribute is incorrect", function () {
        correctVersions.forEach(function (correctVersion) {
            wrongVersions.forEach(function (wrongVersion) {
                expect(compareVersions(correctVersion, wrongVersion)).toBeNull();
                expect(compareVersions(wrongVersion, correctVersion)).toBeNull();
            });
        });
    });
    
    it("should return 0 for equal versions", function() {
        correctVersions.forEach(function (item) {
            expect(compareVersions(item, item)).toEqual(0);
            expect(compareVersions('1.2.3', '1.02.003')).toEqual(0);
        });
    });

    it("should return -1 if left version is lower", function() {
        versionPairs.forEach(function (pair) {
            expect(compareVersions(pair[0], pair[1])).toEqual(-1);
        });
    });

    it("should return 1 if left version is higher", function() {
        versionPairs.forEach(function (pair) {
            expect(compareVersions(pair[1], pair[0])).toEqual(1);
        });
    });

});