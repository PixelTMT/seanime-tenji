import { ProfileMenuSection } from "@/components/features/profile/profile-menu"
import { SafeView } from "@/components/layout/layout-view"
import { Button } from "@/components/ui/button"
import { usePlayerPreferences } from "@/lib/player/player-preferences"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import * as React from "react"
import { ScrollView, Text, TextInput, View, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function BuiltInPlayerSettingsScreen() {
    const { back } = useRouter()
    const insets = useSafeAreaInsets()
    const [prefs, updatePrefs] = usePlayerPreferences()
    const [mpvConf, setMpvConf] = React.useState(prefs.mpvConf)

    const handleSave = React.useCallback(() => {
        updatePrefs({ mpvConf })
        back()
    }, [back, mpvConf, updatePrefs])

    return (
        <SafeView>
            <View className="flex-1 bg-background">
                {/* Header */}
                <View className="flex-row items-center px-4 py-4 border-b border-white/5">
                    <Button variant="ghost" size="icon" onPress={() => back()} className="mr-2">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Button>
                    <Text className="text-xl font-bold text-foreground">Built-in Player Settings</Text>
                </View>

                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="p-4 gap-6">
                        <View className="gap-2">
                            <Text className="text-sm font-semibold text-white/70 uppercase tracking-wider">Custom MPV Configuration</Text>
                            <Text className="text-xs text-white/40 leading-5">
                                Enter custom options for the built-in mpv player. Each line should be a valid mpv option (e.g., <Text className="text-brand-200">vf=format=yuv420p</Text>).
                                {"\n\n"}
                                These settings are applied when a video starts playing. Use with caution as incorrect options can cause playback to fail.
                            </Text>

                            <View className="mt-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                                <TextInput
                                    value={mpvConf}
                                    onChangeText={setMpvConf}
                                    placeholder="e.g. vf=format=yuv420p"
                                    placeholderTextColor="rgba(255,255,255,0.2)"
                                    multiline
                                    numberOfLines={10}
                                    textAlignVertical="top"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    className="p-4 text-sm text-white font-mono"
                                    style={{ minHeight: 200, fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace" }}
                                />
                            </View>
                        </View>

                        <Button onPress={handleSave} size="lg" className="w-full">
                            <Text className="text-foreground font-bold">Save Configuration</Text>
                        </Button>

                        <View className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                            <Text className="text-xs font-semibold text-white/30 uppercase mb-2">Common Options</Text>
                            <Text className="text-xs leading-5 text-white/20">
                                <Text className="text-white/40 font-bold">vf=format=yuv420p</Text>: Fixes black screen on some Android devices.{"\n"}
                                <Text className="text-white/40 font-bold">hwdec=mediacodec-copy</Text>: (Android) Standard hardware decoding.{"\n"}
                                <Text className="text-white/40 font-bold">hwdec=no</Text>: Disable hardware decoding if you face artifacts.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeView>
    )
}
