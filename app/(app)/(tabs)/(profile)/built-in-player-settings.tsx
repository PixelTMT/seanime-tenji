import { ProfileMenuItem, ProfileMenuSection, ProfileSubpageHeader } from "@/components/features/profile/profile-menu"
import { useIOSScrollRefreshRateWorkaround } from "@/hooks/use-ios-scroll-refresh-rate-workaround"
import { useRouter } from "expo-router"
import * as React from "react"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function BuiltInPlayerSettingsScreen() {
    const insets = useSafeAreaInsets()
    const router = useRouter()

    useIOSScrollRefreshRateWorkaround()

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <ProfileSubpageHeader
                title="Built-in Player"
                detail="Settings for the built-in mpv player."
            />

            <ScrollView
                className="flex-1 bg-background"
                contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
                contentInsetAdjustmentBehavior="automatic"
            >
                <View className="mx-4 mt-4 gap-4">
                    <ProfileMenuSection title="Configuration">
                        <ProfileMenuItem
                            icon="settings-outline"
                            label="Edit mpv.conf"
                            detail="Advanced mpv options and troubleshooting fixes"
                            onPress={() => router.push("/(app)/(tabs)/(profile)/edit-mpv-conf" as never)}
                        />
                    </ProfileMenuSection>
                </View>
            </ScrollView>
        </View>
    )
}
