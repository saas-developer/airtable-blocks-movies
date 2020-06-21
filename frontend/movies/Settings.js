import React, { useState } from 'react';
import { cursor } from '@airtable/blocks';
import { useGlobalConfig, Label, Box, Input, InputSynced, Button, Dialog, Heading } from '@airtable/blocks/ui';

export default function Settings() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const globalConfig = useGlobalConfig();
    // omdbApiKey value?
    const omdbApiKey = globalConfig.get(['settings', 'omdbApiKey']);
    console.log('omdbApiKey', omdbApiKey);


    const handleSettingsLinkClick = () => {
        setIsDialogOpen(true)
    }

    return (
        <div>
            <Button
                onClick={handleSettingsLinkClick}
                size="small"
                icon="settings"
            >
                Settings
            </Button>

            {isDialogOpen && (
                <Dialog onClose={() => setIsDialogOpen(false)} width="320px">
                    <Dialog.CloseButton />
                    <Heading>Settings</Heading>

                    <Label htmlFor="my-input">Settings</Label>
                    <InputSynced
                    	globalConfigKey={['settings', 'omdbApiKey']}
                    	placeholder="OMDB Api Key"
                    	width="320px"
                    />
                    
                    
                    <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                </Dialog>
              )}
        </div>
    )
}