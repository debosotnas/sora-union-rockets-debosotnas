import { IGithubUserInfo } from "@/types/global";
import { useEffect, useState } from "react";
import { getGithubUserInfoMemo } from '@/httpApi/httpApi';
import { Avatar, Grid, Typography, Box, Paper, Link } from "@mui/material";

const getGithubUserInfoByName = getGithubUserInfoMemo();

const userLabels: string[] = [
    'login',
    'name',
    'company',
    'blog',
    'location',
    'bio',
    'twitter_username',
    'public_repos',
    'public_gists',
    'followers',
    'following'
]

function Label ({ label, value, className}: {label: string, value: string, className: string}) {
    const linkLabels: string[] = [
        'login',
        'blog',
        'twitter_username',
    ];

    const linkItem = (link: string, text: string) =>
        <Link href={link} target="_blank" rel="noopener">{text}</Link>;

    const linkURLs: Map<string, Function> = new Map([
        ['login', (d: string) => linkItem(`https://github.com/${d}`, 'Github Profile')],
        ['blog', (d: string) => linkItem(d.indexOf('https') === 0 ? d : `https://${d}`, d)],
        ['twitter_username', (d: string) => linkItem(`https://twitter.com/${d}`, 'Twitter Profile')]
    ]);

    const getValueFromLabel = (lbl: string, data: string) => {
        if (linkLabels.includes(lbl)) {
            const fn = linkURLs.get(lbl)
            if (fn) {
                return fn(data);
            }
        }
        return data;
    }

    const k = label.split('_').join(' ');
    const v = getValueFromLabel(label, value);
    return <Typography className={className}><span><b>{k}</b>: </span>{v}</Typography>
}

export default function UserInfo({ githubUser }: { githubUser: string }) {
    const [userInfo, setUserInfo] = useState<IGithubUserInfo | null>(null);
    useEffect(() => {
        async function getUserInfo() {
            const info = await getGithubUserInfoByName(githubUser);
            setUserInfo(info);
        }
        getUserInfo();
    }, [githubUser]);

    type UserInfoKey = keyof typeof userInfo;

    return (
        userInfo ? (
            <Grid container>
                <Grid item>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Paper sx={{padding: '10px', borderRadius: '4px'}} elevation={13}>
                            <Avatar
                                sx={{ width: '100px', height: '100px' }}
                                src={userInfo.avatar_url}
                                variant="square">
                            </Avatar>
                        </Paper>
                    </Box>
                    <Grid container>
                        <Grid item>
                            {
                                userLabels.map((lbl: string, idx: number) => {
                                    const data: string = userInfo[lbl as UserInfoKey];
                                    return data ? (
                                        <Label 
                                            key={`${idx}-${userInfo.id}`}
                                            label={lbl}
                                            value={data}
                                            className={'capitalize-text'}
                                        />
                                    ) : false;
                                }).filter(Boolean)
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        ) : (
            <Grid container>
                <Grid item>
                    Loading info...
                </Grid>
            </Grid>
        )
    );
}