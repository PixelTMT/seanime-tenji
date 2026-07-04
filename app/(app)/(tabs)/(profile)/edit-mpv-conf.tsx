import { ProfileSubpageHeader } from "@/components/features/profile/profile-menu"
import { usePlayerPreferences } from "@/lib/player/player-preferences"
import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function EditMpvConfScreen() {
    const insets = useSafeAreaInsets()
    const [prefs, updatePrefs] = usePlayerPreferences()
    const [mpvConf, setMpvConf] = React.useState(prefs.mpvConf)
    const mpvConfRef = React.useRef(mpvConf)

    React.useEffect(() => {
        mpvConfRef.current = mpvConf
    }, [mpvConf])

    // Save when component unmounts
    React.useEffect(() => {
        return () => {
            updatePrefs({ mpvConf: mpvConfRef.current })
        }
    }, [updatePrefs])

    return (
        <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
            <ProfileSubpageHeader
                title="Edit mpv.conf"
                detail="Advanced mpv configuration"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 bg-background"
                    contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
                    contentInsetAdjustmentBehavior="automatic"
                >
                    <View className="mx-4 mt-4 p-4 rounded-xl bg-white/5 min-h-[300px]">
                        <TextInput
                            multiline
                            placeholder={"# Add mpv options here\n# e.g.\n# vf=format=yuv420p"}
                            placeholderTextColor="rgba(255,255,255,0.2)"
                            value={mpvConf}
                            onChangeText={setMpvConf}
                            style={{
                                color: "#ffffff",
                                fontSize: 14,
                                fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
                                textAlignVertical: "top",
                                minHeight: 250,
                            }}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
