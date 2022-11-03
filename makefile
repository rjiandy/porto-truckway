# Set the default parameters for the build, can be overridden with either an
# environment variable or by using `make target KEY=VALUE`.

# ANDROID COMMANDS
run-android-dev:
	cp .env.${ENV} .env
	. run-server.sh && react-native run-android

run-android-staging:
	cp .env.${ENV} .env
	. run-server.sh && react-native run-android

run-android-release:
	cp .env.${ENV} .env
	. run-server.sh && react-native run-android --variant=release

# build-android:
# 	ENV_FILE=.env.$(ENV)
# 	. cd android && ./gradlew clean && ./gradlew assembleRelease
	#make copy-artifact-android
	#please config here


# IOS COMMANDS
# Run IOS application locally while passing on .env configuration file
run-ios:
	. run-server.sh && react-native run-ios

run-ios-device:
	. run-server.sh && react-native run-ios --device

run-ios-simulatorX:
	. run-server.sh && react-native run-ios --simulator="iPhone X"

run-ios-release:
	# Prepare a 'release' version of the iOS app and run in simulator
	. run-server.sh && react-native run-ios --configuration=release

build-android-dev:    
	sed -i '' 's/Truckway/Truckway Dev/g' android/app/src/main/res/values/strings.xml
	sed -i '' 's/com.truckway.android/com.truckway.android.dev/g' android/app/build.gradle android/app/src/main/AndroidManifest.xml android/app/src/main/java/com/tmsway/MainActivity.java android/app/src/main/java/com/tmsway/MainApplication.java
	ENV_FILE=.env.$(ENV)
	cp .env.${ENV} .env && cd android && ./gradlew clean && ./gradlew assembleRelease
	sed -i '' 's/Truckway Dev/Truckway/g' android/app/src/main/res/values/strings.xml
	sed -i '' 's/com.truckway.android.dev/com.truckway.android/g' android/app/build.gradle android/app/src/main/AndroidManifest.xml android/app/src/main/java/com/tmsway/MainActivity.java android/app/src/main/java/com/tmsway/MainApplication.java

build-android-staging:    
	sed -i '' 's/Truckway/Truckway Staging/g' android/app/src/main/res/values/strings.xml
	sed -i '' 's/com.truckway.android/com.truckway.android.staging/g' android/app/build.gradle android/app/src/main/AndroidManifest.xml android/app/src/main/java/com/tmsway/MainActivity.java android/app/src/main/java/com/tmsway/MainApplication.java
	ENV_FILE=.env.$(ENV)
	cp .env.${ENV} .env && cd android && ./gradlew clean && ./gradlew assembleRelease
	sed -i '' 's/Truckway Staging/Truckway/g' android/app/src/main/res/values/strings.xml
	sed -i '' 's/com.truckway.android.staging/com.truckway.android/g' android/app/build.gradle android/app/src/main/AndroidManifest.xml android/app/src/main/java/com/tmsway/MainActivity.java android/app/src/main/java/com/tmsway/MainApplication.java

build-android:    
	sed -i '' 's/Truckway/Truckway/g' android/app/src/main/res/values/strings.xml
	sed -i '' 's/com.truckway.android/com.truckway.android/g' android/app/build.gradle android/app/src/main/AndroidManifest.xml android/app/src/main/java/com/truckwaymobile/MainActivity.java android/app/src/main/java/com/truckwaymobile/MainApplication.java android/app/src/main/java/com/truckwaymobile/SplashActivity.java
	ENV_FILE=.env.$(ENV)
	cp .env.${ENV} .env && npx jetify && cd android && ./gradlew clean && ./gradlew assembleRelease


build-aab-android:    
	sed -i '' 's/TruckwayMobile/Truckway/g' android/app/src/main/res/values/strings.xml
	sed -i '' 's/com.truckway.android/com.truckway.android/g' android/app/build.gradle android/app/src/main/AndroidManifest.xml android/app/src/main/java/com/truckwaymobile/MainActivity.java android/app/src/main/java/com/truckwaymobile/MainApplication.java android/app/src/main/java/com/truckwaymobile/SplashActivity.java
	ENV_FILE=.env.$(ENV)
	cp .env.${ENV} .env && npx jetify && cd android && ./gradlew clean && ./gradlew bundleRelease