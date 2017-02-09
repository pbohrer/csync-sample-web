import PackageDescription

let package = Package(
    name: "kitura-angular-csync-demo",

	dependencies: [
		.Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 1),
		.Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1)
	]
)
