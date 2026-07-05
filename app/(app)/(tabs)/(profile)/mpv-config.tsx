import { SafeView } from "@/components/layout/layout-view"
import { DEFAULT_MPV_CONF, usePlayerPreferences } from "@/lib/player/player-preferences"
import React from "react"
import { ScrollView, TextInput, View, Text, Pressable, Alert } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function MpvConfigScreen() {
    const [prefs, updatePrefs] = usePlayerPreferences()
    const [config, setConfig] = React.useState(prefs.mpvConf)
    const insets = useSafeAreaInsets()
    const { back } = useRouter()

    const handleSave = React.useCallback(() => {
        updatePrefs({ mpvConf: config })
        Alert.alert("Success", "mpv configuration saved. Changes will apply next time you open the player.")
    }, [config, updatePrefs])

    const handleReset = React.useCallback(() => {
        Alert.alert(
            "Reset configuration?",
            "This will restore the default mpv.conf settings.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: () => {
                        setConfig(DEFAULT_MPV_CONF)
                    }
                }
            ]
        )
    }, [])

    return (
        <SafeView>
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-white/10">
                <View className="flex-row items-center gap-4">
                    <Pressable onPress={back} className="p-1">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text className="text-xl font-bold text-foreground">mpv.conf</Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={handleReset} className="bg-white/10 px-4 py-1.5 rounded-full">
                        <Text className="text-white font-semibold">Reset</Text>
                    </Pressable>
                    <Pressable onPress={handleSave} className="bg-brand-500 px-4 py-1.5 rounded-full">
                        <Text className="text-white font-semibold">Save</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView
                className="flex-1 px-4 pt-4"
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
            >
                <Text className="text-white/60 mb-4 text-sm">
                    Advanced: Direct access to mpv.conf. Be careful as incorrect settings may cause the player to fail.
                </Text>

                <View className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <TextInput
                        className="p-4 text-foreground font-mono text-sm"
                        style={{ minHeight: 400, textAlignVertical: "top" }}
                        multiline
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={config}
                        onChangeText={setConfig}
                        placeholder="Enter mpv configuration here..."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                    />
                </View>
            </ScrollView>
        </SafeView>
    )
}
