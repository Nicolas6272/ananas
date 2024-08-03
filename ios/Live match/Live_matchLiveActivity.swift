//
//  Live_matchLiveActivity.swift
//  Live match
//
//  Created by Nicolas Jacquis on 31/07/2024.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct Live_matchAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct Live_matchLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: Live_matchAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension Live_matchAttributes {
    fileprivate static var preview: Live_matchAttributes {
        Live_matchAttributes(name: "World")
    }
}

extension Live_matchAttributes.ContentState {
    fileprivate static var smiley: Live_matchAttributes.ContentState {
        Live_matchAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: Live_matchAttributes.ContentState {
         Live_matchAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: Live_matchAttributes.preview) {
   Live_matchLiveActivity()
} contentStates: {
    Live_matchAttributes.ContentState.smiley
    Live_matchAttributes.ContentState.starEyes
}
